import { Request, Response } from "express";
import logger from "../utils/logger";
import { formatResponse } from "../utils/response-format";
import {
 createShipmentService,
 trackPackagesService,
 updateShipmentService,
} from "../services/packages.service";
import { verify } from "../utils/tokenizer";
import { IUserLoginTokenDTO } from "../interfaces";
import mongoose from "mongoose";
import constants from "../utils/constants";

export const createPackageController = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }

    const payload = validationResponse.data as IUserLoginTokenDTO;
    if (!payload || !payload.id) {
      return res
        .status(401)
        .json(formatResponse({ isSuccess: false, message: "Unauthorized" }));
    }

    const currentUser = new mongoose.Types.ObjectId(payload.id);

    const response = await createShipmentService(req.body, currentUser);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: constants.errorMessage.default }));
  }
};

export const updatePackageController = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }

    const packageId = req.params.id;

    const response = await updateShipmentService(req.body, packageId);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: constants.errorMessage.default }));
  }
};

export const trackPackage = async (req: Request, res: Response) => {
  try {
    const response = await trackPackagesService(req.params.trackingId);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: constants.errorMessage.default }));
  }
};
