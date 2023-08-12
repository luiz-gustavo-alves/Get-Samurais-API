import userService from "../services/user.service.js";

export const getProfile =  async (req, res) => {

    const { token } = res.locals.session;

    try {
        const profileInfo = await userService.getProfileInfo({...req.body}, token);
        res.send(profileInfo.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getServicesStatus = async (req, res) => {
    res.send(req.body);
}