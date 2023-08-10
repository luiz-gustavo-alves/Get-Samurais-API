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

const serviceProviderRouter = Router();
serviceProviderRouter.use(serviceProviderAuthValidation);

serviceProviderRouter.get("/services/me", getCreatedServices);
serviceProviderRouter.post("/services", schemaValidation(serviceSchema), createService);
serviceProviderRouter.put("/services/:id", schemaValidation(serviceSchema), serviceIdValidation, updateService);
serviceProviderRouter.delete("/services/:id", serviceIdValidation, deleteService);

export default serviceProviderRouter;