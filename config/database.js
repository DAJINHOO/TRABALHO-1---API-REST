import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'biblioteca',
    max: 10, // número máximo de conexões simultâneas
    idle_in_transaction_session_timeout: 30000
})