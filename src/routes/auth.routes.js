import { Router } from "express";
import { 
    userSignUp,
    serviceProviderSignUp,
    signIn,
    logout
} from "../controllers/auth.controller.js";

import { 
    userSignUpSchema, 
    serviceProviderSignUpSchema,
    signInSchema,
    logoutSchema
} from "../schemas/auth.schema.js";

import { dataSanitization } from "../middlewares/dataSanitization.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { emailValidation } from "../middlewares/emailValidation.js";
import { authValidation } from "../middlewares/authValidation.js";

const authRouter = Router();
authRouter.use(dataSanitization);

authRouter.post("/signup/user", schemaValidation(userSignUpSchema), emailValidation, userSignUp);
authRouter.post("/signup/service-provider", schemaValidation(serviceProviderSignUpSchema), emailValidation, serviceProviderSignUp);
authRouter.post("/signin", schemaValidation(signInSchema), signIn);
authRouter.post("/logout", authValidation, schemaValidation(logoutSchema), logout);

export default authRouter;