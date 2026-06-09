AREA 51 - V10 PRESERVAR IDS EXISTENTES

CAMBIO PRINCIPAL:
- El importador ya NO deja vacíos los ID de juegos que ya existen en el Excel exportado desde la web.
- Si el juego existe en el Excel actual, lo reconoce por Nombre + Categoría y conserva su ID.
- Si el juego es nuevo, lo crea con ID vacío para que la web genere el ID automáticamente.

NO SE TOCA:
- Productos físicos.
- api/igdb.js.
- api/health.js.
- api/buscarTrailer.js.
- package.json.
- Lógica de precios D/E/F.
- Lógica de trailers reales.
- Lógica de descripciones premium.

ARCHIVO A REEMPLAZAR:
- index.html

ARCHIVOS API:
- Se conservan igual que estaban.
