require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { initializeDatabase, query } = require('./database');
const stickersRouter = require('./routes/stickers');
const playersRouter = require('./routes/players');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/stickers', stickersRouter);
app.use('/api/players', playersRouter);

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', app: 'Panini Album 2026 API' });
});

async function start() {
  await initializeDatabase();

  const rows = await query('SELECT COUNT(*)::int as count FROM stickers');
  const count = rows[0]?.count || 0;

  if (count === 0) {
    console.log('BD vacia, ejecutando seed...');
    const seed = require('./seed');
    await seed();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API corriendo en puerto ${PORT}`);
  });
}

start().catch(console.error);
