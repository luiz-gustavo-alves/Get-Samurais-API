import authService from "../services/auth.service.js";

export const emailValidation = async (req, res, next) => {

    const { email } = req.body;

    try {

        const request = await authService.findByEmail(email);
        if (request !== null) {
            return res.status(401).send("E-mail já está em uso!");
        }
        next();

    } catch (err) {
        res.status(500).send(err.message);
    }
}