import userService from "../services/user.service.js";

export const getUserProfile =  async (req, res) => {

    const { token } = res.locals.session;

    try {
        const profileInfo = await userService.getProfileInfo({...req.body}, token);
        res.send(profileInfo.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getServiceProviderProfile = async (req, res) => {

    const { id } = req.params;
    const { offset } = req.query;
    
    try {
        const serviceProviderProfileInfo = await userService.getServiceProviderProfile(id, offset);
        res.send(serviceProviderProfileInfo);

    } catch (err) {
        
        if (err.code === "22P02") {
            return res.status(404).send("Perfil não encontrado");
        }
        res.status(500).send(err.message);
    } 
}