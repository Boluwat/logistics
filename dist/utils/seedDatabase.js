"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const faker_1 = require("@faker-js/faker");
const interfaces_1 = require("../interfaces");
const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            firstname: faker_1.faker.person.firstName(),
            lastname: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            password: faker_1.faker.internet.password(),
        });
    }
    return users;
};
const generatePacakges = (count, userCount) => {
    const pack = [];
    const statuses = [
        interfaces_1.PackageStatus.Pending,
        interfaces_1.PackageStatus.InTransit,
        interfaces_1.PackageStatus.OutForDelivery,
        interfaces_1.PackageStatus.ReadyForPickup,
        interfaces_1.PackageStatus.Delivered,
    ];
    for (let i = 0; i < count; i++) {
        pack.push({
            id: i + 1,
            name: faker_1.faker.commerce.product(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            pickUpDate: faker_1.faker.date.future(),
            trackingId: faker_1.faker.string.uuid(),
            createdAt: faker_1.faker.date.recent(),
            updatedAt: faker_1.faker.date.recent(),
            userId: Math.floor(Math.random() * userCount) + 1,
        });
    }
    return pack;
};
const seedDatabase = async () => {
    const db = await (0, sqlite_1.open)({
        filename: './database.db',
        driver: sqlite3_1.default.Database,
    });
    try {
        await db.exec('BEGIN TRANSACTION');
        // Generate and seed users
        const users = generateUsers(10);
        for (const user of users) {
            await db.run('INSERT INTO users (firstname, lastname, phone, password, email) VALUES (?, ?, ?, ?, ?)', user.firstname, user.lastname, user.phone, user.password, user.email);
        }
        // Generate and seed packages
        const packages = generatePacakges(20, users.length);
        for (const pack of packages) {
            await db.run('INSERT INTO packages (name, status, pickUpDate, userId, trackingId) VALUES (?, ?, ?, ?, ?)', pack.name, pack.status, pack.pickUpDate, pack.userId, pack.trackingId);
        }
        await db.exec('COMMIT');
        console.log('Database seeded successfully.');
    }
    catch (error) {
        await db.exec('ROLLBACK');
        console.error('Error seeding database:', error);
    }
    finally {
        await db.close();
    }
};
seedDatabase();
