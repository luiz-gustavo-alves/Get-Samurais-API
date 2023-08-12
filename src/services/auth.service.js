import db from "../database/db.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { checkSessionType } from "../utils/checkSessionType.js";

const registerUser = async (payload) => {

    const { 
        name, 
        email, 
        password 
    } = payload;

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await db.query(
        `INSERT INTO users
            (name, email, password)
         VALUES ($1, $2, $3);
        `, [name, email, encryptedPassword]
    );
}

const registerServiceProvider = async (payload) => {

    const { 
        name, 
        email, 
        password,
        cellphoneNumber,
        CEP,
        address,
        city,
        UF
    } = payload;

    const currentAddress = await db.query(
        `INSERT INTO addresses
            ("CEP", address, city, "UF")
         VALUES ($1, $2, $3, $4)
         RETURNING id;
        `, [CEP, address, city, UF]
    )

    const { id } = currentAddress.rows[0];

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await db.query(
        `INSERT INTO "serviceProviders"
            ("addressId", name, email, password, "cellphoneNumber")
         VALUES ($1, $2, $3, $4, $5);
        `, [id, name, email, encryptedPassword, cellphoneNumber]
    );
}

const findByEmail = async (email) => {

    const requestUser = await db.query(
        `SELECT users.id, users.email AS "userEmail", users.password
         FROM users
         WHERE email = $1
        `, [email]
    )

    if (requestUser.rows[0]) {
        return requestUser;
    }

    const requestServiceProvider = await db.query(
        `SELECT "serviceProviders".id, "serviceProviders".email AS "serviceProviderEmail", "serviceProviders".password
         FROM "serviceProviders"
         WHERE email = $1
        `, [email]
    )

    if (requestServiceProvider.rows[0]) {
        return requestServiceProvider;
    }

    return null;
}

const login = async (payload) => {

    const { email } = payload;

    const request = await findByEmail(email);
    if (request === null) {
        return { successfulLoginAttempt: false };
    }

    const passwordValidation = bcrypt.compareSync(payload.password, request.rows[0].password);
    if (!passwordValidation) {
        return { successfulLoginAttempt: false };
    }

    delete request.rows[0].password;
    return { successfulLoginAttempt: true, data: request.rows[0] };
}

const createToken = async (payload) => {

    const token = uuid();
    const session = checkSessionType({...payload});
    
    if (Object.keys(session).length === 0) {
        return null;
    }

    if (session.type === "userSession") {

        await db.query(
            `DELETE FROM "userSessions"
                WHERE "userId" = $1;
            `, [payload.id]
        );
    
        await db.query(
            `INSERT INTO "userSessions"
                ("userId", token)
             VALUES ($1, $2);
            `, [payload.id, token]
        );

    } else if (session.type === "serviceProviderSession") {

        await db.query(
            `DELETE FROM "serviceProviderSessions"
                WHERE "serviceProviderId" = $1;
            `, [payload.id]
        );
    
        await db.query(
            `INSERT INTO "serviceProviderSessions"
                ("serviceProviderId", token)
             VALUES ($1, $2);
            `, [payload.id, token]
        );
    }

    return { token, type: session.type };
}

const getSessionByToken = async (token) => {

    const userSession = await db.query(
        `SELECT *
            FROM "userSessions"
            WHERE token = $1;
        `, [token]
    );

    if (userSession.rows[0]) {
        return userSession;
    }

    const serviceProviderSession = await db.query(
        `SELECT *
            FROM "serviceProviderSessions"
            WHERE token = $1;
        `, [token]
    );

    if (serviceProviderSession.rows[0]) {
        return serviceProviderSession;
    }

    return null;
}

const logout = async (payload, token) => {

    const { type } = payload;

    if (type === "userSession") {

        await db.query(
            `DELETE FROM "userSessions"
                WHERE token = $1;
            `, [token]
        );

    } else if (type === "serviceProviderSession") {

        await db.query(
            `DELETE FROM "serviceProviderSessions"
                WHERE token = $1;
            `, [token]
        );
    }
}

const authService = {
    registerUser,
    registerServiceProvider,
    findByEmail,
    login,
    createToken,
    getSessionByToken,
    logout
};

export default authService;