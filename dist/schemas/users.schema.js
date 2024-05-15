"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePayloadSchema = exports.createPayloadSchema = exports.loginPayloadSchema = void 0;
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.loginPayloadSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({
        required_error: "Email is required.",
    }).email(),
    password: (0, zod_1.string)({
        required_error: "Password is required.",
    }),
});
exports.createPayloadSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({
        required_error: "Email is required.",
    }).email(),
    password: (0, zod_1.string)({
        required_error: "Password is required.",
    }),
    firstname: (0, zod_1.string)({
        required_error: "Firstname is required.",
    }),
    lastname: (0, zod_1.string)({
        required_error: "Lastname is required.",
    }),
    phone: (0, zod_1.string)({
        required_error: "Phone number is required.",
    }),
});
exports.updatePayloadSchema = (0, zod_1.object)({
    email: (0, zod_1.string)().email().optional(),
    phone: (0, zod_1.string)().optional(),
    address: (0, zod_1.object)({
        state: (0, zod_1.string)().optional(),
        country: (0, zod_1.string)().optional(),
        street: (0, zod_1.string)().optional(),
    }).optional(),
});
