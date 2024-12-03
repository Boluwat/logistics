import { Router } from "express";
import { createPackageController, trackPackage, updatePackageController, } from "../controllers/package.controller";
import { validateBodyParams, validatePathParams, validateQueryParams } from "../middlewares/validate-middleware";
import { createPayloadSchema, trackPayloadSchema, updatePayloadSchema } from "../schemas/package.schema";
import { paginationQuerySchema } from "../schemas/paginations";

const router = Router();

router.post(
  "/package",
  validateBodyParams(createPayloadSchema, false),
  createPackageController
);

router.patch(
  "/package/:id",
  validatePathParams(updatePayloadSchema, false),
  updatePackageController
);

router.get(
  "/package/:trackingId",
  validatePathParams(trackPayloadSchema, false),
  trackPackage
);


export default router;
