import mariadb from 'mariadb';
import { configuration } from './configuration';

export const pool = mariadb.createPool({
    host: configuration.dbIp,
    database: configuration.dbSchema,
    user: configuration.dbUser,
    password: configuration.dbPass
});