module.exports = async function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'AREA 51 Importador V6',
    igdbConfigured: Boolean(process.env.TWITCH_CLIENT_ID && process.env.TWITCH_CLIENT_SECRET)
  });
};
