// AREA 51 - API IGDB para Vercel
// Usa variables de entorno: TWITCH_CLIENT_ID y TWITCH_CLIENT_SECRET

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Faltan TWITCH_CLIENT_ID o TWITCH_CLIENT_SECRET en Vercel.');
  }

  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) return cachedToken;

  const url = new URL('https://id.twitch.tv/oauth2/token');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('client_secret', clientSecret);
  url.searchParams.set('grant_type', 'client_credentials');

  const res = await fetch(url.toString(), { method: 'POST' });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`No se pudo obtener token Twitch: ${res.status} ${txt}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = now + Math.max(60, (data.expires_in || 3600) - 300) * 1000;
  return cachedToken;
}

function escapeIgdbSearch(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function normalizeName(name) {
  return String(name || '')
    .replace(/\bPS4\s*[-/]\s*PS5\b/gi, '')
    .replace(/\bPS5\s*[-/]\s*PS4\b/gi, '')
    .replace(/\bPS4\b/gi, '')
    .replace(/\bPS5\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function queryIgdbGame(name) {
  const token = await getAccessToken();
  const clientId = process.env.TWITCH_CLIENT_ID;
  const cleanName = normalizeName(name);

  const body = `
    search "${escapeIgdbSearch(cleanName)}";
    fields
      name,
      summary,
      storyline,
      genres.name,
      game_modes.name,
      multiplayer_modes.offlinecoop,
      multiplayer_modes.onlinecoop,
      multiplayer_modes.offlinecoopmax,
      multiplayer_modes.onlinecoopmax,
      multiplayer_modes.onlinemax,
      multiplayer_modes.offlinemax,
      platforms.name,
      first_release_date,
      involved_companies.developer,
      involved_companies.publisher,
      involved_companies.company.name,
      language_supports.language.name,
      language_supports.language_support_type.name;
    limit 5;
  `;

  const res = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'text/plain'
    },
    body
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`IGDB error ${res.status}: ${txt}`);
  }

  const results = await res.json();
  const exact = results.find(g => String(g.name || '').toLowerCase() === cleanName.toLowerCase());
  const selected = exact || results[0] || null;
  return { query: cleanName, selected, results };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const game = req.query.game || req.query.juego;
      if (!game) return res.status(400).json({ ok: false, error: 'Falta ?game=' });
      const data = await queryIgdbGame(game);
      return res.status(200).json({ ok: true, ...data });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const games = Array.isArray(body.games) ? body.games : [];
      if (!games.length) return res.status(400).json({ ok: false, error: 'Falta lista games[]' });

      const limited = games.slice(0, 25); // evita timeouts. El front procesa por tandas.
      const items = [];
      for (const game of limited) {
        try {
          const data = await queryIgdbGame(game);
          items.push({ ok: true, game, ...data });
        } catch (err) {
          items.push({ ok: false, game, error: err.message });
        }
      }
      return res.status(200).json({ ok: true, items, limit: 25 });
    }

    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
