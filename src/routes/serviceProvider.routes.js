import { Router } from "express";

const serviceProviderRouter = Router();

//serviceProviderRouter.use(authMiddleware);

serviceProviderRouter.get("/services/me");
serviceProviderRouter.post("/services");
serviceProviderRouter.put("/services/:id");
serviceProviderRouter.delete("/services/:id");

export default serviceProviderRouter;