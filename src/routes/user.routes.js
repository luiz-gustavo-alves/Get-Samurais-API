import { Router } from "express";

import {
    getProfile,
    getServicesStatus
} from "../controllers/user.controller.js";

import { authValidation } from "../middlewares/authValidation.js";

const userRouter = Router();
userRouter.use(authValidation);

userRouter.get("/profile", getProfile);
userRouter.get("/profile/services/status", getServicesStatus)

export default userRouter;