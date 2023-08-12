import db from "../database/db.connection.js";
import authService from "./auth.service.js";

const getProfileInfo = async (payload, token) => {

    const { type } = payload;
    const session = await authService.getSessionByToken(token);

    if (type === "userSession") {

        const { userId } = session.rows[0];
        const userInfo = await db.query(
            `SELECT * FROM users
                WHERE id = $1
            `, [userId]
        );

        delete userInfo.rows[0].password
        return userInfo;

    } else if (type === "serviceProviderSession") {
        
        const { serviceProviderId } = session.rows[0];
        const serviceProviderInfo = await db.query(
            `SELECT "serviceProviders".*,
                    addresses.id AS "addressId",
                    addresses."CEP", 
                    addresses.city, 
                    addresses."UF",
                    addresses.address,
                    addresses.complement
             FROM "serviceProviders"
             JOIN addresses
                ON "addressId" = "serviceProviders".id
             WHERE "serviceProviders".id = $1
            `, [serviceProviderId]
        );

        delete serviceProviderInfo.rows[0].password
        return serviceProviderInfo;
    }
}


const userService = {
    getProfileInfo
}

export default userService;