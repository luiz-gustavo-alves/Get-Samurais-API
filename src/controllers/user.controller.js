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
    
    try {
        const serviceProviderProfileInfo = await userService.getServiceProviderProfile(id);
        res.send(serviceProviderProfileInfo);

    } catch (err) {
        
        if (err.code === "22P02") {
            return res.status(404).send("Perfil não encontrado");
        }
        res.status(500).send(err.message);
    } 
}