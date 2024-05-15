"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPayloadSchema = exports.updatePayloadSchema = exports.createPayloadSchema = void 0;
// import { number, required } from "joi";
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.createPayloadSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({
        required_error: "Package name is required.",
    }),
    pickUpDate: (0, zod_1.string)(),
});
exports.updatePayloadSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().optional(),
    pickUpDate: (0, zod_1.string)().optional(),
});
exports.trackPayloadSchema = (0, zod_1.object)({
    trackingId: (0, zod_1.string)({
        required_error: "Package Id is required"
    })
});
