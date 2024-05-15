import { IUserDTO, IUserLoginSuccessResponseDTO } from "../interfaces";
import { sign } from "../utils/tokenizer";

export const generateLoginResponse = (
  user: IUserDTO
): IUserLoginSuccessResponseDTO => {

  return {
    user: user,
    token: sign({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    }),
  };
};