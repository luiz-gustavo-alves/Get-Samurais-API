import { Router } from "express";

import {
    getUserProfile,
    getServiceProviderProfile
} from "../controllers/user.controller.js";

import { authValidation } from "../middlewares/authValidation.js";
import { offsetValidation } from "../middlewares/offsetValidation.js";

const userRouter = Router();

userRouter.post("/profile/me", authValidation, getUserProfile);
userRouter.get("/profile/service-provider/:id", offsetValidation, getServiceProviderProfile);

export default userRouter;