import { Router } from "express";

import {
    getServices,
    getServiceById,
    getServicesByRole
} from "../controllers/service.controller.js";

import { offsetValidation } from "../middlewares/offsetValidation.js";

const serviceRouter = Router();

serviceRouter.get("/services/", offsetValidation, getServices);
serviceRouter.get("/services/roles/:role", offsetValidation, getServicesByRole);
serviceRouter.get("/services/:id", getServiceById);

export default serviceRouter;