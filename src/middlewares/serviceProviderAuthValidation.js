import serviceProviderService from "../services/serviceProvider.service.js";

export const serviceProviderAuthValidation = async (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
   
    if (!token) {
        return res.sendStatus(401);
    }

    try {

        const session = await serviceProviderService.getServiceProviderSession(token);
        if (!session.rows[0]) {
            return res.sendStatus(401);
        }

        res.locals.session = session.rows[0];
        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}