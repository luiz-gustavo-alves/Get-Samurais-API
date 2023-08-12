import serviceService from "../services/service.service.js";

export const serviceIdValidation = async (req, res, next) => {

    const { id } = req.params;

    try {

        const service = await serviceService.getServiceById(id);
        if (!service.rows[0]) {
            return res.sendStatus(404);
        }

        if (service.rows[0].id !== Number(id)) {
            return res.sendStatus(401);
        }

        res.locals.serviceId = service.rows[0].id;
        next();

    } catch (err) {
        res.status(500).send(err.message);
    }
}