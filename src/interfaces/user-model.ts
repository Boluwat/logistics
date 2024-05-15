

export interface ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}
export interface IUserDTO {
  id: number;
  firstname: string;
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
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface IGetUsersResponseDTO  {
  users: IUserDTO[];
  pageCount: number;
  totalCount: number;
}
