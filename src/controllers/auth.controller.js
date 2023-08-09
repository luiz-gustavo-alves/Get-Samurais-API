import authService from "../services/auth.service.js";

export const userSignUp = async (req, res) => {

    try {
        await authService.registerUser({...req.body});
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const serviceProviderSignUp = async (req, res) => {

    try {
        await authService.registerServiceProvider({...req.body});
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const signIn = async (req, res) => {

    try {

        const request = await authService.login({...req.body});
        if (!request.successfulLoginAttempt) {
            return res.status(404).send("E-mail ou senha incorretos!");
        }

        const auth = await authService.createToken(request.data);
        res.send(auth);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const logout = async (req, res) => {

    const { token } = res.locals.session;

    try {

        await authService.logout({...req.body, token});
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
}