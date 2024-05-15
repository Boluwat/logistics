"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePathParams = exports.validateQueryAndBody = exports.validateQueryParams = exports.validateBodyParams = void 0;
const tokenizer_1 = require("../utils/tokenizer");
const validateBodyParams = (schema, isAuth = true) => async (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.parse(Object.assign({}, req.body));
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
};
exports.validateBodyParams = validateBodyParams;
const validateQueryParams = (schema, isAuth = true) => async (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.parse(req.query);
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
};
exports.validateQueryParams = validateQueryParams;
const validateQueryAndBody = (schema, isAuth = true) => async (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.query.parse(req.query);
        schema.body.parse(Object.assign({}, req.body));
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
};
exports.validateQueryAndBody = validateQueryAndBody;
const validatePathParams = (schema, isAuth = true) => async (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.parse(req.params);
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
};
exports.validatePathParams = validatePathParams;
const authenticate = (req) => {
    const authorizationHeader = req.headers["authorization"];
    const isAuthResponse = (0, tokenizer_1.verify)(authorizationHeader);
    if (isAuthResponse.isSuccess) {
        const userDetails = isAuthResponse.data;
        req.app.set("userDetails", userDetails);
    }
    return isAuthResponse;
};
