const { Pool } = require('pg');

let pool = null;

function getPool() {
  if (!pool) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return pool;
}

async function initializeDatabase() {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS stickers (
      id SERIAL PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      player_name TEXT NOT NULL,
      team TEXT NOT NULL,
      position TEXT,
      obtained INTEGER NOT NULL DEFAULT 0,
      repeated INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  return pool;
}

async function query(text, params) {
  const result = await getPool().query(text, params);
  return result.rows;
}

async function queryOne(text, params) {
  const rows = await query(text, params);
  return rows.length > 0 ? rows[0] : null;
}

module.exports = { initializeDatabase, getPool, query, queryOne };
