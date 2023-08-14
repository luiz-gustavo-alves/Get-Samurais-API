import { Router } from "express";

import {
    getUserProfile,
    getServiceProviderProfile,
    searchServiceByQuery
} from "../controllers/user.controller.js";

import { authValidation } from "../middlewares/authValidation.js";
import { offsetValidation } from "../middlewares/offsetValidation.js";
import { queryValidation } from "../middlewares/queryValidation.js";

import { searchQuerySchema } from "../schemas/searchQuery.schema.js";

const userRouter = Router();

userRouter.get("/profile/service-provider/:id", offsetValidation, getServiceProviderProfile);
userRouter.post("/profile/me", authValidation, getUserProfile);
userRouter.post("/search-service/", queryValidation(searchQuerySchema), offsetValidation, searchServiceByQuery);

export default userRouter;