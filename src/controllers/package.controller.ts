import { Request, Response } from "express";
import logger from "../utils/logger";
import { formatResponse } from "../utils/response-format";
import {
  createPackageService,
  updatePackageService,
  trackPackagesService,
} from "../services/packages.service";
import { verify } from "../utils/tokenizer";
import { IUserLoginTokenDTO } from "../interfaces";

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

    const currentUser = { id: payload.id };

    const response = await createPackageService(req.body, currentUser);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};

export const updatePackageController = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }

    const packageId = Number(req.params.id);

    const response = await updatePackageService(req.body, packageId);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};

export const trackPackage = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }
   

    const response = await trackPackagesService(req.params.trackingId);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};
