export interface ICustomErrorDTO {
    error: string;
    message?: string;
  }
  export interface IServiceResponseDTO <T>{
    isSuccess: boolean;
    message?: string;
    data: T;
  }

