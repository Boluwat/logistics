import mongoose from 'mongoose'
import logger from "./logger";
import * as dotenv from 'dotenv';

dotenv.config();


export const initDB = async () => {
    try {
      const mongodbUrl = process.env.DB_HOST || '';
      mongoose.connect(mongodbUrl).then(() => logger.log({
        level: 'info',
        message: 'connected to databse',
      }));
    } catch (error) {
      logger.error('Error connecting to the database:', error)
    }
  };
  

  

// export const connectDatabase = async () => {
//     try {
//         const db = await open({
//             filename: DB_FILE_PATH,
//             driver: sqlite3.Database
//         });
//         logger.info('Connected to the database');
//         await createTables(db);
//         return db;
//     } catch (error) {
//         logger.error('Error connecting to the database:', error);
//         throw error;
//     }
// };

