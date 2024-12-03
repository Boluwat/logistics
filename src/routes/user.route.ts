import { Router } from "express";
import { activateUserController, loginController, signUpController } from "../controllers/user.controllers";
import { validateBodyParams, validatePathParams } from "../middlewares/validate-middleware";
import { activateUserSchema, createPayloadSchema, loginPayloadSchema } from "../schemas/users.schema";

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

router.get(
  "/users/activate/:userId",
  validatePathParams(activateUserSchema, false),
  activateUserController
)


export default router;
