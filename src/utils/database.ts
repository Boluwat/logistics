import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import logger from "./logger";

const DB_FILE_PATH = './database.db';

export const connectDatabase = async () => {
    try {
        const db = await open({
            filename: DB_FILE_PATH,
            driver: sqlite3.Database
        });
        logger.info('Connected to the database');
        await createTables(db);
        return db;
    } catch (error) {
        logger.error('Error connecting to the database:', error);
        throw error;
    }
};

async function createTables(db: Database<sqlite3.Database, sqlite3.Statement>) {
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


        logger.info('Users and packages tables created');
    } catch (error) {
        logger.error('Error creating tables:', error);
    }
}
