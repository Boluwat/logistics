import { Response, Request, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { ParamsDictionary } from "express-serve-static-core";
import { verify } from "../utils/tokenizer";

export const validateBodyParams =
  (schema: AnyZodObject, isAuth: boolean = true) =>
  async (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<ParamsDictionary, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (isAuth) {
        const isAuthResponse = authenticate(req);
        if (!isAuthResponse.isSuccess) {
          return res.status(400).json(isAuthResponse);
        }
      }

      schema.parse({ ...req.body });
      next();
    } catch (error: Error | unknown) {
      return res.status(400).json({ isSuccess: false, data: error });
    }
  };

export const validateQueryParams =
  (schema: AnyZodObject, isAuth: boolean = true) =>
  async (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<ParamsDictionary, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (isAuth) {
        const isAuthResponse = authenticate(req);
        if (!isAuthResponse.isSuccess) {
          return res.status(400).json(isAuthResponse);
        }
      }
      schema.parse(req.query);
      next();
    } catch (error: Error | unknown) {
      return res.status(400).json({ isSuccess: false, data: error });
    }
  };

export const validateQueryAndBody =
  (
    schema: { query: AnyZodObject; body: AnyZodObject },
    isAuth: boolean = true
  ) =>
  async (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<ParamsDictionary, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (isAuth) {
        const isAuthResponse = authenticate(req);
        if (!isAuthResponse.isSuccess) {
          return res.status(400).json(isAuthResponse);
        }
      }
      schema.query.parse(req.query);
      schema.body.parse({ ...req.body });
      next();
    } catch (error: Error | unknown) {
      return res.status(400).json({ isSuccess: false, data: error });
    }
  };

export const validatePathParams =
  (schema: AnyZodObject, isAuth: boolean = true) =>
  async (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<ParamsDictionary, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (isAuth) {
        const isAuthResponse = authenticate(req);
        if (!isAuthResponse.isSuccess) {
          return res.status(400).json(isAuthResponse);
        }
      }
      schema.parse(req.params);
      next();
    } catch (error: Error | unknown) {
      return res.status(400).json({ isSuccess: false, data: error });
    }
  };

const authenticate = (req: Request) => {
  const authorizationHeader = req.headers["authorization"];
  const isAuthResponse = verify(authorizationHeader);
  if (isAuthResponse.isSuccess) {
    const userDetails = isAuthResponse.data;
    req.app.set("userDetails", userDetails);
  }
  return isAuthResponse;
};