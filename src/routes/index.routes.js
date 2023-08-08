import { Router } from "express";
import authRouter from "./auth.routes.js";
import serviceProviderRouter from "./serviceProvider.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use(authRouter);
router.use(serviceProviderRouter);
router.use(userRouter);

export default router;