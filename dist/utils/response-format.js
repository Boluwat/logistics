"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const formatResponse = ({ isSuccess = false, data, message }) => ({
    isSuccess,
    message,
    data,
});
exports.formatResponse = formatResponse;
