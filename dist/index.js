"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const database_1 = require("./utils/database");
const bootstrap_1 = __importDefault(require("./utils/bootstrap"));
require("./utils/cronjob");
async function startServer() {
    const app = (0, bootstrap_1.default)();
    const port = config_1.default.port;
    try {
        await (0, database_1.connectDatabase)();
        const server = app.listen(port, () => {
            logger_1.default.info(`Server is running on port ${port}`);
        });
        return server;
    }
    catch (error) {
        logger_1.default.error('Failed to connect to the database:', error);
        // process.exit(1); // Exit the process if unable to connect to the database
    }
}
startServer();
