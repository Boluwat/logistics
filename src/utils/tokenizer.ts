import jwt from "jsonwebtoken";

import config from "./config";
import logger from "./logger";
import { IServiceResponseDTO, IUserLoginTokenDTO } from "../interfaces";
import { formatResponse } from "./response-format";
import constants from "./constants";

export const sign = (data: IUserLoginTokenDTO): string => {
  return jwt.sign(data, config.jwtSecret, { expiresIn: "1440m" });
};
export const verify = (
  authorizationHeader: string | undefined
): IServiceResponseDTO<IUserLoginTokenDTO | undefined | string> => {
  try {
    if (!authorizationHeader) {
      return formatResponse({
        isSuccess: false,
        message: constants.errorMessage.Unauthorized,
      });
    }

    const parts = authorizationHeader.split(" ");

    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
      return formatResponse({
        isSuccess: false,
        message: constants.errorMessage.Unauthorized,
      });
    }

    const token = parts[1];
    const payload = jwt.verify(token, config.jwtSecret) as
      | IUserLoginTokenDTO
      | undefined;
    return formatResponse({ isSuccess: true, data: payload });
  } catch (err) {
    return formatResponse({ isSuccess: false, message: constants.errorMessage.Unauthorized, });
    logger.error(err);
  }
};
