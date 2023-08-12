import db from "../database/db.connection.js";

const getServices = async (offset) => {

    const currentOffset = 20 * (offset);
    const services = await db.query(
        `SELECT * FROM services
         WHERE available = 1::bit
            ORDER BY id DESC
            LIMIT 20 OFFSET $1;
        `, [currentOffset]
    );

    return services;
}

const getServicesByRole = async (role, offset) => {

    const currentOffset = 20 * (offset);
    const services = await db.query(
        `SELECT * FROM services
         WHERE available = 1::bit AND role = $1
            ORDER BY id DESC
            LIMIT 20 OFFSET $2;
        `, [role, currentOffset]
    );

    return services;
}

const getServiceById = async (id) => {

    const service = await db.query(
        `SELECT services.*, 
                addresses."CEP", 
                addresses.city, 
                addresses."UF",
                addresses.address,
                addresses.complement,
                "serviceProviders".name,
                "serviceProviders"."cellphoneNumber"
         FROM services
         JOIN addresses
            ON addresses.id = services."serviceProviderId"
         JOIN "serviceProviders"
            ON "serviceProviders".id = services."serviceProviderId"
         WHERE available = 1::bit AND services.id = $1;
        `, [id]
    );

    return service;
}

const serviceService = {
    getServices,
    getServicesByRole,
    getServiceById
}

export default serviceService;