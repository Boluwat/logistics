import { Router } from "express";
import { loginController, signUpController } from "../controllers/user.controllers";
import { validateBodyParams } from "../middlewares/validate-middleware";
import { createPayloadSchema, loginPayloadSchema } from "../schemas/users.schema";

const router = Router();

router.post(
  "/onboarding/sign-up",
  validateBodyParams(createPayloadSchema, false),
  signUpController
);

router.post(
  "/users/login",
  validateBodyParams(loginPayloadSchema, false),
  loginController
);


export default router;
