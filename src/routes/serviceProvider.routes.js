import { Router } from "express";

import {
    getCreatedServices,
    createService,
    updateService,
    deleteService
} from "../controllers/serviceProvider.controller.js";

import { 
    serviceSchema 
} from "../schemas/serviceProvider.schema.js";

import { schemaValidation } from "../middlewares/schemaValidation.js";
import { serviceProviderAuthValidation } from "../middlewares/serviceProviderAuthValidation.js";
import { serviceIdValidation } from "../middlewares/serviceIdValidation.js";
import { offsetValidation } from "../middlewares/offsetValidation.js";

const serviceProviderRouter = Router();

serviceProviderRouter.get("/services/me", serviceProviderAuthValidation, offsetValidation, getCreatedServices);
serviceProviderRouter.post("/api/services", serviceProviderAuthValidation, schemaValidation(serviceSchema), createService);
serviceProviderRouter.put("/api/services/:id", serviceProviderAuthValidation, schemaValidation(serviceSchema), serviceIdValidation, updateService);
serviceProviderRouter.delete("/api/services/:id", serviceProviderAuthValidation, serviceIdValidation, deleteService);

export default serviceProviderRouter;