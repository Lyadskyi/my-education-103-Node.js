import { Router } from "express";
import { userSignupSchema, userSigninSchema } from "../validation/users.js";

import * as authControllers from "../controllers/auth.js";

import validateBody from "../utils/validatebody.js";
import ctrlWrapper from "../utils/ctrlWpapper.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);

authRouter.get("/verify", ctrlWrapper(authControllers.verifyController));

authRouter.post(
  "/signin",
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/signout", ctrlWrapper(authControllers.signoutController));

export default authRouter;
