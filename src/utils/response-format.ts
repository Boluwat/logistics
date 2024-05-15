import { IServiceResponseDTO } from "../interfaces";

export const formatResponse = <T>(
  { isSuccess = false, data, message }: { isSuccess?: boolean; data?: T; message?: string }
): IServiceResponseDTO<T | undefined> => ({
  isSuccess,
  message,
  data,
});