import { Router } from "express";

import * as authControllers from "../controllers/auth.js";

import validateBody from "../utils/validatebody.js";
import ctrlWrapper from "../utils/ctrlWpapper.js";

import { userSignupSchema, userSigninSchema } from "../validation/users.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);

authRouter.post(
  "/signin",
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

export default authRouter;
