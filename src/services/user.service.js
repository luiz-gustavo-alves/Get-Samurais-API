import db from "../database/db.connection.js";
import authService from "./auth.service.js";
import serviceProviderService from "./serviceProvider.service.js";

const getProfileInfo = async (payload, token) => {

    const { type } = payload;
    const session = await authService.getSessionByToken(token);

    if (type === "userSession") {

        const { userId } = session.rows[0];
        const userInfo = await db.query(
            `SELECT * FROM users
                WHERE id = $1;
            `, [userId]
        );

        delete userInfo.rows[0].password
        return userInfo;

    } else if (type === "serviceProviderSession") {
        
        const { serviceProviderId } = session.rows[0];
        const serviceProviderInfo = await db.query(
            `SELECT "serviceProviders".*,
                    addresses.*
             FROM "serviceProviders"
             JOIN addresses
                ON addresses.id = "serviceProviders"."addressId"
             WHERE "serviceProviders".id = $1;
            `, [serviceProviderId]
        );

        delete serviceProviderInfo.rows[0].addressId
        delete serviceProviderInfo.rows[0].password

        return serviceProviderInfo;
    }
}

const getServiceProviderProfile = async (id, offset) => {

    const serviceProviderInfo = await db.query(
        `SELECT "serviceProviders".*,
                addresses.*
         FROM "serviceProviders"
         JOIN addresses
            ON addresses.id = "serviceProviders"."addressId"
         WHERE "serviceProviders".id = $1;
        `, [id]
    );

    if (!serviceProviderInfo.rows[0]) {
        return [];
    }

    const counter = await serviceProviderService.countCreatedServices(id);

    const currentOffset = 10 * (offset);
    const servicesFromProvider = await db.query(
        `SELECT * FROM services
         WHERE available = 1::bit AND services."serviceProviderId" = $1
            ORDER BY id DESC
            LIMIT 10 OFFSET $2;
        `, [id, currentOffset]
    )

    delete serviceProviderInfo.rows[0].addressId
    delete serviceProviderInfo.rows[0].password

    const services = servicesFromProvider.rows.map(service => service);
    const result = {
        counter,
        info: {...serviceProviderInfo.rows[0]},
        services
    }

    return result;
}

const countSearchServiceByQuery = async (query) => {

    const counter = await db.query(
        `SELECT COUNT(*) FROM services
         WHERE available = 1::bit AND title LIKE '%'||$1||'%'
        `, [query]
    )

    return counter.rows[0].count;
}

const searchServiceByQuery = async (query, order, offset) => {

    const counter = await userService.countSearchServiceByQuery(query);

    const currentOrder = (!order || order === "date") ? "id" : order;
    const currentOffset = 20 * (offset);

    let services;

    /* Hardcoded cuz for some odd reason SQL can't read price from query param */
    if (currentOrder === "price") {

        services = await db.query(
            `SELECT * FROM services
             WHERE available = 1::bit AND LOWER(title) LIKE LOWER('%'||$1||'%')
                ORDER BY price DESC
                LIMIT 20 OFFSET $2;
            `, [query, currentOffset]
        )

    } else {

        services = await db.query(
            `SELECT * FROM services
             WHERE available = 1::bit AND LOWER(title) LIKE LOWER('%'||$1||'%')
                ORDER BY $2 DESC
                LIMIT 20 OFFSET $3;
            `, [query, currentOrder, currentOffset]
        )
    }

    const servicesList = services.rows.map(service => service);
    const result = {
        counter,
        data: [...servicesList]
    }
    return result;
}

const userService = {
    getProfileInfo,
    getServiceProviderProfile,
    countSearchServiceByQuery,
    searchServiceByQuery
}

export default userService;