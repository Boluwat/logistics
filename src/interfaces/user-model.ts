import mongoose, {Document} from 'mongoose';


export interface IUserDocument extends Document {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  password: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}
export interface IUserDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  isActivated: boolean;
  lastname: string;
  email: string;
  phone?: string;
}

export interface IUserLoginSuccessResponseDTO {
  user: IUserDTO;
  token: string;
}

export interface IUserUpdateDTO {
  phone?: string;
  email?: string;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUserLoginTokenDTO {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface IGetUsersResponseDTO  {
  users: IUserDTO[];
  pageCount: number;
  totalCount: number;
}
