import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { faker } from "@faker-js/faker";
import {
  ICreateUserDTO,
  IUserDTO,
  Package,
  PackageStatus,
} from "../interfaces";

const generateUsers = (count: number): ICreateUserDTO[] => {
  const users: ICreateUserDTO[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
    });
  }
  return users;
};

const generatePacakges = (count: number, userCount: number): Package[] => {
  const pack: Package[] = [];
  const statuses = [
    PackageStatus.Pending,
    PackageStatus.InTransit,
    PackageStatus.OutForDelivery,
    PackageStatus.ReadyForPickup,
    PackageStatus.Delivered,
  ];

  for (let i = 0; i < count; i++) {
    pack.push({
      id: i + 1,
      name: faker.commerce.product(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      pickUpDate: faker.date.future(),
      trackingId: faker.string.uuid(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      userId: Math.floor(Math.random() * userCount) + 1,
    });
  }
  return pack;
};

const seedDatabase = async () => {
    const db: Database = await open({
      filename: './database.db',
      driver: sqlite3.Database,
    });
  
    try {
      await db.exec('BEGIN TRANSACTION');
  
      // Generate and seed users
      const users = generateUsers(10);
      for (const user of users) {
        await db.run(
          'INSERT INTO users (firstname, lastname, phone, password, email) VALUES (?, ?, ?, ?, ?)',
           user.firstname, user.lastname, user.phone, user.password, user.email,
        );
      }
  
      // Generate and seed packages
      const packages = generatePacakges(20, users.length);
      for (const pack of packages) {
        await db.run(
          'INSERT INTO packages (name, status, pickUpDate, userId, trackingId) VALUES (?, ?, ?, ?, ?)',
          pack.name, pack.status, pack.pickUpDate, pack.userId, pack.trackingId,
        );
      }
  
      await db.exec('COMMIT');
      console.log('Database seeded successfully.');
    } catch (error) {
      await db.exec('ROLLBACK');
      console.error('Error seeding database:', error);
    } finally {
      await db.close();
    }
  };
  
  seedDatabase();
