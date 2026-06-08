# AREA 51 - Importador de Ofertas V6 IGDB

Herramienta interna para GitHub + Vercel.

## Qué hace

- Subís el Excel descargado de la web.
- Pegás el listado nuevo de ofertas.
- Conserva productos físicos.
- Borra/reemplaza solo juegos.
- Deja ID vacío para juegos.
- Limpia PS4 / PS5 del nombre visible.
- Agrupa el mismo juego en una sola fila:
  - D: precio general
  - E: precio PS4
  - F: precio PS5
- Conserva trailers/descripciones existentes si son completas.
- Reemplaza descripciones vacías, genéricas o incompletas.
- Consulta IGDB desde Vercel para mejorar datos técnicos.
- Si falta trailer, coloca búsqueda cerrada en GameTrailers.

## Variables de entorno en Vercel

Cargar en `Settings > Environment Variables`:

```txt
TWITCH_CLIENT_ID=tu_client_id
TWITCH_CLIENT_SECRET=tu_client_secret
```

No subir esos datos a GitHub.

## Límites honestos

IGDB ayuda con géneros, plataformas, modos de juego, fecha y datos generales.
Para peso exacto de descarga, idiomas exactos y PS Plus al 100%, algunas veces IGDB no alcanza. En esos casos el importador deja “Pendiente de confirmación” para no inventar.

## Deploy

1. Subir esta carpeta a GitHub.
2. Importar el repositorio en Vercel.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Agregar variables de entorno.
7. Deploy.

## Prueba rápida

Después del deploy abrir:

```txt
https://TU-DOMINIO.vercel.app/api/health
```

Debe devolver `igdbConfigured: true`.

Luego probar:

```txt
https://TU-DOMINIO.vercel.app/api/igdb?game=God%20of%20War%20Ragnarok
```
