import { Router } from "express";

import {
    getServices,
    getServiceById,
    getServicesByRole
} from "../controllers/service.controller.js";

import { offsetValidation } from "../middlewares/offsetValidation.js";
import { authValidation } from '../middlewares/authValidation.js';

const serviceRouter = Router();

serviceRouter.get("/services/", offsetValidation, getServices);
serviceRouter.get("/services/roles/:role", offsetValidation, getServicesByRole);
serviceRouter.get("/services/:id", authValidation, getServiceById);

export default serviceRouter;