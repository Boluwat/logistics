"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};
const logger = (0, winston_1.createLogger)({
    levels: logLevels,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console({
            level: 'debug',
        }),
        new winston_1.transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        new winston_1.transports.File({ filename: 'combined.log' }),
    ],
});
exports.default = logger;
