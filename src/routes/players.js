const { Router } = require('express');

const router = Router();

const SPORTSDB_BASE = 'https://www.thesportsdb.com/api/v1/json/3';

router.get('/search', async (req, res) => {
  const { name } = req.query;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'El parametro name es obligatorio' });
  }

  try {
    const url = `${SPORTSDB_BASE}/searchplayers.php?p=${encodeURIComponent(name.trim())}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.player || data.player.length === 0) {
      return res.json({ players: [], message: 'No se encontraron jugadores' });
    }

    const players = data.player.map((p) => ({
      id: p.idPlayer,
      name: p.strPlayer,
      nationality: p.strNationality,
      sport: p.strSport,
      team: p.strTeam,
      position: p.strPosition,
      birthDate: p.dateBorn,
      birthPlace: p.strBirthLocation,
      description: p.strDescriptionEN ? p.strDescriptionEN.substring(0, 500) : null,
      photo: p.strThumb || p.strCutout || p.strRender,
      banner: p.strBanner,
      facebook: p.strFacebook,
      twitter: p.strTwitter,
      instagram: p.strInstagram,
      height: p.strHeight,
      weight: p.strWeight,
    }));

    res.json({ players });
  } catch (error) {
    console.error('Error al consultar TheSportsDB:', error.message);
    res.status(502).json({ error: 'Error al consultar la API externa' });
  }
});

module.exports = router;
