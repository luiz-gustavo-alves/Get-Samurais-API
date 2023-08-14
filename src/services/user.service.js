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
         WHERE services."serviceProviderId" = $1
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

const userService = {
    getProfileInfo,
    getServiceProviderProfile
}

export default userService;