"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationQuerySchema = void 0;
const zod_1 = require("zod");
exports.paginationQuerySchema = zod_1.z.object({
    limit: zod_1.z.coerce
        .number().optional(),
    offset: zod_1.z.coerce
        .number().optional(),
});
