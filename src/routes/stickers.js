const { Router } = require('express');
const { getDatabase, saveDatabase } = require('../database');

const router = Router();

function queryAll(sql, params = []) {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

router.get('/obtained', (req, res) => {
  const rows = queryAll('SELECT * FROM stickers WHERE obtained = 1 ORDER BY code');
  res.json(rows);
});

router.get('/pending', (req, res) => {
  const rows = queryAll('SELECT * FROM stickers WHERE obtained = 0 ORDER BY code');
  res.json(rows);
});

router.get('/repeated', (req, res) => {
  const rows = queryAll('SELECT * FROM stickers WHERE repeated > 0 ORDER BY code');
  res.json(rows);
});

router.post('/register', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'El campo code es obligatorio' });
  }

  const sticker = queryOne('SELECT * FROM stickers WHERE code = ?', [code]);
  if (!sticker) {
    return res.status(404).json({ error: `La lamina ${code} no existe en el album` });
  }

  const db = getDatabase();
  if (sticker.obtained === 0) {
    db.run("UPDATE stickers SET obtained = 1, updated_at = datetime('now') WHERE code = ?", [code]);
    saveDatabase();
    return res.json({ message: `Lamina ${code} registrada como obtenida`, action: 'new' });
  } else {
    db.run("UPDATE stickers SET repeated = repeated + 1, updated_at = datetime('now') WHERE code = ?", [code]);
    saveDatabase();
    return res.json({ message: `Lamina ${code} ya la tenias, ahora tienes una repetida`, action: 'repeated' });
  }
});

router.post('/exchange', (req, res) => {
  const { repeatedCode, newCode } = req.body;
  if (!repeatedCode || !newCode) {
    return res.status(400).json({ error: 'Los campos repeatedCode y newCode son obligatorios' });
  }

  const repeatedSticker = queryOne('SELECT * FROM stickers WHERE code = ?', [repeatedCode]);
  if (!repeatedSticker) {
    return res.status(404).json({ error: `La lamina repetida ${repeatedCode} no existe` });
  }
  if (repeatedSticker.repeated <= 0) {
    return res.status(400).json({ error: `No tienes laminas repetidas de ${repeatedCode} para intercambiar` });
  }

  const newSticker = queryOne('SELECT * FROM stickers WHERE code = ?', [newCode]);
  if (!newSticker) {
    return res.status(404).json({ error: `La lamina ${newCode} no existe en el album` });
  }
  if (newSticker.obtained === 1) {
    return res.status(400).json({ error: `Ya tienes la lamina ${newCode}, no puedes intercambiarla` });
  }

  const db = getDatabase();
  db.run("UPDATE stickers SET repeated = repeated - 1, updated_at = datetime('now') WHERE code = ?", [repeatedCode]);
  db.run("UPDATE stickers SET obtained = 1, updated_at = datetime('now') WHERE code = ?", [newCode]);
  saveDatabase();

  res.json({
    message: `Intercambio exitoso: diste ${repeatedCode} (repetida) y recibiste ${newCode}`,
    givenAway: repeatedCode,
    received: newCode
  });
});

module.exports = router;
