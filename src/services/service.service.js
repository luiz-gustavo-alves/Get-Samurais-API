import db from "../database/db.connection.js";

const countAllServices = async () => {

    const counter = await db.query(
        `SELECT COUNT(*) FROM services;`
    )

    return counter.rows[0];
}

const countServicesByRole = async (role) => {

    const counter = await db.query(
        `SELECT COUNT(*) FROM services
         WHERE services.role = $1;
        `, [role]
    )

    return counter.rows[0];
}

const getServices = async (offset) => {

    const counter = await serviceService.countAllServices();

    const currentOffset = 20 * (offset);
    const services = await db.query(
        `SELECT * FROM services
         WHERE available = 1::bit
            ORDER BY id DESC
            LIMIT 20 OFFSET $1;
        `, [currentOffset]
    );

    const servicesList = services.rows.map(service => service);
    const result = {
        counter,
        data: [...servicesList]
    }

    return result;
}

const getServicesByRole = async (role, offset) => {

    const counter = await serviceService.countServicesByRole(role);

    const currentOffset = 20 * (offset);
    const services = await db.query(
        `SELECT * FROM services
         WHERE available = 1::bit AND role = $1
            ORDER BY id DESC
            LIMIT 20 OFFSET $2;
        `, [role, currentOffset]
    );

    const servicesList = services.rows.map(service => service);
    const result = {
        counter,
        data: [...servicesList]
    }

    return result;
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
         WHERE services.id = $1;
        `, [id]
    );

    return service;
}

const serviceService = {
    countAllServices,
    countServicesByRole,
    getServices,
    getServicesByRole,
    getServiceById
}

export default serviceService;