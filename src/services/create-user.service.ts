import logger from "../utils/logger";
import { User } from "../models/users";
import {
  ICreateUserDTO,
  IServiceResponseDTO,
  IUserDTO,
  IUserLoginDTO,
  IUserLoginSuccessResponseDTO,
} from "../interfaces";
import constants from "../utils/constants";
import { formatResponse } from "../utils/response-format";
import { hashManager } from "../utils/hash-manager";
import { generateLoginResponse } from "./login-utils.service";
import { mapUserStoreModelToDTO } from "../utils/util";

export const createUser = async (
  payload: ICreateUserDTO
): Promise<IServiceResponseDTO<IUserDTO | undefined>> => {
  try {
    const { email } = payload;
    const user = await User.findOne({ email });

    if (user) {
      return formatResponse({
        isSuccess: false,
        message: `User ${constants.errorMessage.exist}`,
      });
    }
    payload.password = await hashManager().hash(payload.password);

    const newUser = await User.create(payload);

    return formatResponse({
      isSuccess: true,
      data: mapUserStoreModelToDTO(newUser),
      message: constants.errorMessage.success,
    });
  } catch (error) {
    logger.error(error);
    return formatResponse({
      isSuccess: false,
      message: constants.errorMessage.default,
    });
  }
};

export const loginUser = async (
  payload: IUserLoginDTO
): Promise<IServiceResponseDTO<IUserLoginSuccessResponseDTO | undefined>> => {
  try {
    const { email, password } = payload;
    const user = await User.findOne({ email });

    if (user) {
      const validate = await hashManager().compare(password, user.password);
      

      if (validate) {    
        if (!user.isActivated) {
          return formatResponse({
            message: constants.errorMessage.notActivated,
          })
        }
        const data: IUserLoginSuccessResponseDTO = generateLoginResponse(mapUserStoreModelToDTO(user));
        return formatResponse({
          isSuccess: true,
          data
        });
      }
    }
    return formatResponse({
      isSuccess: false,
      message: constants.errorMessage.invalidLoginMessage,
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  }
};

export const activateAccountService = async ({
  userId,
}: {
  userId: string;
}): Promise<IServiceResponseDTO<IUserLoginSuccessResponseDTO | undefined>> => {
  try {
      interface Query {
          _id?: string;
          isActivated: boolean;
      }

      const query: Query = { isActivated: false };
      
      if (userId) {
          query._id = userId;
      }
     
      const updateUser = await User.findOneAndUpdate(
          query, 
          {
          isActivated: true,
      }, {
          new: true,
      }
      );
      if (updateUser) {
        const data = generateLoginResponse(mapUserStoreModelToDTO(updateUser));
        return formatResponse({
            isSuccess: true,
            data
        });
      }
      return formatResponse({
          isSuccess: false,
          message: constants.errorMessage.invalidUser,
      });
  } catch (error) {
      logger.error(error);
      return formatResponse({
          message: constants.errorMessage.default,
      });
  }
}
