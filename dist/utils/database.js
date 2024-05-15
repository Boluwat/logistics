"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const logger_1 = __importDefault(require("./logger"));
const DB_FILE_PATH = './database.db';
const connectDatabase = async () => {
    try {
        const db = await (0, sqlite_1.open)({
            filename: DB_FILE_PATH,
            driver: sqlite3_1.default.Database
        });
        logger_1.default.info('Connected to the database');
        await createTables(db);
        return db;
    }
    catch (error) {
        logger_1.default.error('Error connecting to the database:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
async function createTables(db) {
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR UNIQUE NOT NULL,
                lastname VARCHAR NOT NULL,
                firstname VARCHAR NOT NULL,
                phone VARCHAR NOT NULL,
                password VARCHAR NOT NULL
            )
        `);
        await db.exec(`
            CREATE TABLE IF NOT EXISTS packages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER NOT NULL,
                name VARCHAR NOT NULL,
                status VARCHAR CHECK(status IN ('in transit', 'out for delivery', 'picked up', 'delivered', 'pending')),
                pickUpDate DATE,
                createdAt DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                updatedAt DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);
        logger_1.default.info('Users and packages tables created');
    }
    catch (error) {
        logger_1.default.error('Error creating tables:', error);
    }
}
