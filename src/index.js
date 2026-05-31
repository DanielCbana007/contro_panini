const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./database');
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
  app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
  });
}

start().catch(console.error);
