import serviceProviderService from "../services/serviceProvider.service.js";

export const getCreatedServices = async (req, res) => {

    const { serviceProviderId } = res.locals.session;
    const { offset } = req.query;

    try {
        const services = await serviceProviderService.getCreatedServices(serviceProviderId, offset);
        res.send(services);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const createService = async (req, res) => {

    const { serviceProviderId } = res.locals.session;

    try {
        await serviceProviderService.createService({ ...req.body }, serviceProviderId);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const updateService = async (req, res) => {

    const { serviceId } = res.locals;

    try {
        await serviceProviderService.updateService({ ...req.body }, serviceId);
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const deleteService = async (req, res) => {

    const { serviceId } = res.locals;

    try {
        await serviceProviderService.deleteService(serviceId);
        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}