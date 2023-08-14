import db from "../database/db.connection.js"

const countCreatedServices = async (id) => {

    const counter = await db.query(
        `SELECT COUNT(*) FROM services
         WHERE "serviceProviderId" = $1
        `, [id]
    )

    return counter.rows[0].count;
}

const getServiceProviderSession = async (token) => {

    const serviceProviderSession = await db.query(
        `SELECT *
            FROM "serviceProviderSessions"
            WHERE token = $1;
        `, [token]
    );

    return serviceProviderSession;
}

const getCreatedServices = async (id, offset) => {

    const counter = await serviceProviderService.countCreatedServices(id);

    const currentOffset = 10 * (offset);
    const services = await db.query(
        `SELECT *
            FROM services
            WHERE "serviceProviderId" = $1
            ORDER BY services.id DESC
            LIMIT 10 OFFSET $2;
        `, [id, currentOffset]
    )

    const servicesList = services.rows.map(service => service);
    const result = {
        counter,
        data: [...servicesList]
    }

    return result;
}

const createService = async (payload, id) => {

    const {
        role,
        title,
        description,
        price,
        available,
        image
    } = payload;

    const isAvailable = (available === "true") ? 1 : 0;
    await db.query(
        `INSERT INTO services
            ("serviceProviderId", role, title, description, price, available, "imageURL")
         VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [id, role, title, description, price, isAvailable, image]
    )
}

const updateService = async (payload, id) => {

    const {
        role,
        title,
        description,
        price,
        available,
        image
    } = payload;

    const isAvailable = (available === "true") ? 1 : 0;
    await db.query(
        `UPDATE services SET
            role = $1,
            title = $2,
            description = $3,
            price = $4,
            available = $5,
            "imageURL" = $6
         WHERE id = $7;
        `, [role, title, description, price, isAvailable, image, id]
    )
}

const deleteService = async (id) => {

    await db.query(
        `DELETE FROM services
         WHERE id = $1
        `, [id]
    );
}

const serviceProviderService = {
    countCreatedServices,
    getServiceProviderSession,
    getCreatedServices,
    createService,
    updateService,
    deleteService
}

export default serviceProviderService;