AREA 51 - IMPORTADOR V13 INTELIGENTE

Archivos a subir/reemplazar en GitHub:
- index.html
- area51_games.json
- area51_alias.json
- area51_history.json
- api/buscarTrailer.js
- api/buscarPortada.js
- api/descargarPortada.js
- api/igdb.js
- api/health.js
- package.json

Variables en Vercel requeridas:
- TWITCH_CLIENT_ID
- TWITCH_CLIENT_SECRET
- STEAMGRIDDB_API_KEY

Mejoras V13:
1) Botón ACTUALIZAR SOLO PRECIOS.
   - Conserva IDs.
   - Conserva descripciones existentes.
   - Conserva trailers existentes.
   - Solo actualiza D/E/F, Oferta, Preventa y Fecha según listado.

2) Alertas avanzadas.
   - Descarga AREA51_ALERTAS.txt.
   - Marca juegos sin ID, preventas sin fecha, trailers pendientes, descripciones vacías, agregados/eliminados.

3) Historial de precios.
   - Descarga AREA51_HISTORIAL_PRECIOS.txt.
   - Compara precio anterior vs precio nuevo en D/E/F para juegos existentes.

4) AREA51_DB real.
   - Lee area51_games.json desde raíz.
   - Si un juego existe ahí, usa descripción/trailer de esa base antes de IGDB/fallback.

5) Alias inteligentes.
   - Lee area51_alias.json desde raíz.
   - Sirve para corregir PES21, GOW RAGNAROK, MINECRAFT PRIMARIA, etc.

6) Mantiene intacto lo validado:
   - IDs existentes.
   - Trailers reales GameTrailers.
   - Portadas por ID.
   - Ganancia automática.
   - Productos físicos protegidos.
   - PS4/PS5 D/E/F.
