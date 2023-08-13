import { Router } from "express";

import {
    getUserProfile,
    getServiceProviderProfile
} from "../controllers/user.controller.js";

import { authValidation } from "../middlewares/authValidation.js";

const userRouter = Router();

userRouter.get("/profile/me", authValidation, getUserProfile);
userRouter.get("/profile/service-provider/:id", getServiceProviderProfile);

export default userRouter;