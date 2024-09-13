import { Dialect, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config(); 

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASS;
const dbDriver: Dialect = "mysql"; 

if (!dbName || !dbUser || !dbHost || dbPassword === undefined) {
    throw new Error('Missing database configuration');
}

const connection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
});

export default connection;
