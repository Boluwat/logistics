import logger from "../utils/logger";
import { connectDatabase } from "../utils/database";
import { ICreateUserDTO, IServiceResponseDTO, IUserDTO, IUserLoginDTO, IUserLoginSuccessResponseDTO } from "../interfaces";
import constants from "../utils/constants";
import { formatResponse } from "../utils/response-format";
import { hashManager } from "../utils/hash-manager";
import { generateLoginResponse } from "./login-utils.service";
import { mapUserStoreModelToDTO } from "../utils/util";

export const createUser = async (
  payload: ICreateUserDTO
): Promise<IServiceResponseDTO<IUserDTO | undefined>> => {
  try {
    const db = await connectDatabase();

    const { firstname, lastname, email, phone, password, } = payload;
    const user = await db.get("SELECT * FROM users WHERE email = ?", email);

    if (user) {
      return formatResponse({
        isSuccess: false,
        message: `User ${constants.errorMessage.exist}`,
      });
    }
    payload.password = await hashManager().hash(password);

    const newUser = await db.run(
      "INSERT INTO users (firstname, lastname, email, phone, password) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, phone, payload.password]
    );

    const insertedUserId = newUser.lastID;

    const insertedUser = await db.get("SELECT * FROM users WHERE id = ?", insertedUserId);

    return formatResponse({
      isSuccess: true,
      data: insertedUser,
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
    const db = await connectDatabase();
      const {email, password} = payload;
      const user = await db.get("SELECT * FROM users WHERE email = ?", email);

      if (user) {
          const validate = await hashManager().compare(
              password,
              user.password
          );

          if (validate) {
              const data: IUserLoginSuccessResponseDTO = generateLoginResponse(mapUserStoreModelToDTO(user))
              return formatResponse({
                  isSuccess: true,
                  data
              })
          }
      }
      return formatResponse({
          isSuccess: false,
          message: 'Email or Password is Invalid'
      });
  } catch (err) {
      logger.error(err);
      return formatResponse({
          isSuccess: false,
          message: 'You just hit a break wall'
      })
  }
}



