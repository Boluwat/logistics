// config.ts
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define your configuration object
const config = {
  port: process.env.PORT || 2000,
  jwtSecret: process.env.JWT_SECRET || 'TEST_SECRET',
};

export default config;
