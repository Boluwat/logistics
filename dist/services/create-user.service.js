"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const database_1 = require("../utils/database");
const constants_1 = __importDefault(require("../utils/constants"));
const response_format_1 = require("../utils/response-format");
const hash_manager_1 = require("../utils/hash-manager");
const login_utils_service_1 = require("./login-utils.service");
const util_1 = require("../utils/util");
const createUser = async (payload) => {
    try {
        const db = await (0, database_1.connectDatabase)();
        const { firstname, lastname, email, phone, password, } = payload;
        const user = await db.get("SELECT * FROM users WHERE email = ?", email);
        if (user) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: `User ${constants_1.default.errorMessage.exist}`,
            });
        }
        payload.password = await (0, hash_manager_1.hashManager)().hash(password);
        const newUser = await db.run("INSERT INTO users (firstname, lastname, email, phone, password) VALUES (?, ?, ?, ?, ?)", [firstname, lastname, email, phone, payload.password]);
        const insertedUserId = newUser.lastID;
        const insertedUser = await db.get("SELECT * FROM users WHERE id = ?", insertedUserId);
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: insertedUser,
            message: constants_1.default.errorMessage.success,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: constants_1.default.errorMessage.default,
        });
    }
};
exports.createUser = createUser;
const loginUser = async (payload) => {
    try {
        const db = await (0, database_1.connectDatabase)();
        const { email, password } = payload;
        const user = await db.get("SELECT * FROM users WHERE email = ?", email);
        if (user) {
            const validate = await (0, hash_manager_1.hashManager)().compare(password, user.password);
            if (validate) {
                const data = (0, login_utils_service_1.generateLoginResponse)((0, util_1.mapUserStoreModelToDTO)(user));
                return (0, response_format_1.formatResponse)({
                    isSuccess: true,
                    data
                });
            }
        }
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: 'Email or Password is Invalid'
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: 'You just hit a break wall'
        });
    }
};
exports.loginUser = loginUser;
