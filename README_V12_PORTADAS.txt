AREA 51 - V12 PORTADAS POR ID

Archivos a subir/reemplazar en GitHub:

1) Reemplazar:
- index.html

2) Agregar dentro de /api:
- api/buscarPortada.js
- api/descargarPortada.js

3) Vercel necesita esta variable:
- STEAMGRIDDB_API_KEY

Qué hace:
- Lee el Excel cargado.
- Toma SOLO filas con Categoría = Juegos.
- Ignora Celulares, Hardware, PSPlus y cualquier otra categoría.
- Usa el ID del juego para nombrar cada imagen.
- Si un juego no tiene ID, lo manda al reporte/manual.
- Genera un ZIP llamado AREA51_PORTADAS_POR_ID.zip.
- Los archivos salen como: ID-nombre-del-juego.jpg/png/webp.
- No toca precios, IDs, trailers, descripciones ni productos físicos.

Ley AREA 51:
No modifica lo que funciona. Solo agrega portadas masivas por ID.
