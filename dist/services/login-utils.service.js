"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLoginResponse = void 0;
const tokenizer_1 = require("../utils/tokenizer");
const generateLoginResponse = (user) => {
    return {
        user: user,
        token: (0, tokenizer_1.sign)({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        }),
    };
};
exports.generateLoginResponse = generateLoginResponse;
