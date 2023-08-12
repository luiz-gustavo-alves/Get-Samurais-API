import authService from "../services/auth.service.js";

export const authValidation = async (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
   
    if (!token) {
        return res.sendStatus(401);
    }

    try {

        const session = await authService.getSessionByToken(token);
        if (session === null) {
            return res.sendStatus(401);
        }

        res.locals.session = session.rows[0];
        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}