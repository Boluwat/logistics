import { IUserDTO } from "../interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapUserStoreModelToDTO = (user: any): IUserDTO => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.mobile,
  });