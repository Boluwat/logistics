import { Request, Response } from "express";
import logger from "../utils/logger";
import { formatResponse } from "../utils/response-format";
import { createUser, loginUser } from "../services/create-user.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await loginUser({ email, password });

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

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, lastname, firstname, phone } = req.body;

    const response = await createUser({
        email,
        password,
        lastname,
        firstname,
        phone,
    });

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