import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ordermanagement',
    password: process.env.DB_PASS,
    port: 5432
});

export default pool;