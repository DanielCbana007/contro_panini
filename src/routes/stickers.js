const { Router } = require('express');
const { query, queryOne } = require('../database');

const router = Router();

router.get('/obtained', async (req, res) => {
  const rows = await query('SELECT * FROM stickers WHERE obtained = 1 ORDER BY code');
  res.json(rows);
});

router.get('/pending', async (req, res) => {
  const rows = await query('SELECT * FROM stickers WHERE obtained = 0 ORDER BY code');
  res.json(rows);
});

router.get('/repeated', async (req, res) => {
  const rows = await query('SELECT * FROM stickers WHERE repeated > 0 ORDER BY code');
  res.json(rows);
});

router.post('/register', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'El campo code es obligatorio' });
  }

  const sticker = await queryOne('SELECT * FROM stickers WHERE code = $1', [code]);
  if (!sticker) {
    return res.status(404).json({ error: `La lamina ${code} no existe en el album` });
  }

  if (sticker.obtained === 0) {
    await query("UPDATE stickers SET obtained = 1, updated_at = NOW() WHERE code = $1", [code]);
    return res.json({ message: `Lamina ${code} registrada como obtenida`, action: 'new' });
  } else {
    await query("UPDATE stickers SET repeated = repeated + 1, updated_at = NOW() WHERE code = $1", [code]);
    return res.json({ message: `Lamina ${code} ya la tenias, ahora tienes una repetida`, action: 'repeated' });
  }
});

router.post('/exchange', async (req, res) => {
  const { repeatedCode, newCode } = req.body;
  if (!repeatedCode || !newCode) {
    return res.status(400).json({ error: 'Los campos repeatedCode y newCode son obligatorios' });
  }

  const repeatedSticker = await queryOne('SELECT * FROM stickers WHERE code = $1', [repeatedCode]);
  if (!repeatedSticker) {
    return res.status(404).json({ error: `La lamina repetida ${repeatedCode} no existe` });
  }
  if (repeatedSticker.repeated <= 0) {
    return res.status(400).json({ error: `No tienes laminas repetidas de ${repeatedCode} para intercambiar` });
  }

  const newSticker = await queryOne('SELECT * FROM stickers WHERE code = $1', [newCode]);
  if (!newSticker) {
    return res.status(404).json({ error: `La lamina ${newCode} no existe en el album` });
  }
  if (newSticker.obtained === 1) {
    return res.status(400).json({ error: `Ya tienes la lamina ${newCode}, no puedes intercambiarla` });
  }

  await query("UPDATE stickers SET repeated = repeated - 1, updated_at = NOW() WHERE code = $1", [repeatedCode]);
  await query("UPDATE stickers SET obtained = 1, updated_at = NOW() WHERE code = $1", [newCode]);

  res.json({
    message: `Intercambio exitoso: diste ${repeatedCode} (repetida) y recibiste ${newCode}`,
    givenAway: repeatedCode,
    received: newCode
  });
});

module.exports = router;
