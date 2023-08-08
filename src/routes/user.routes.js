import { Router } from "express";

const userRouter = Router();

userRouter.get("/services");
userRouter.get("/services/:id");

export default userRouter;