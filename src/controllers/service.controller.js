import serviceService from "../services/service.service.js";

export const getServices = async (req, res) => {

    const { offset } = req.query;

    try {
        const services = await serviceService.getServices(offset);
        res.send(services);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getServicesByRole = async (req, res) => {

    const { role } = req.params;
    const { offset } = req.query;

    try {
        const services = await serviceService.getServicesByRole(role, offset);
        res.send(services);

    } catch (err) {

        if (err.code === "22P02") {
            return res.status(400).send("Categoria inválida.");
        }

        res.status(500).send(err.message);
    }
}

export const getServiceById = async (req, res) => {

    const { id } = req.params;

    try {
        const service = await serviceService.getServiceById(id);
        res.send(service.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}