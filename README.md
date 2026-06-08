# AREA 51 - Importador de Ofertas V5

Importador interno para GitHub + Vercel.

## Qué hace

- Sube Excel descargado de la web.
- Pega listado nuevo de ofertas.
- Conserva productos físicos.
- Borra/reemplaza solo juegos.
- Deja ID vacío para juegos.
- Limpia PS4 / PS5 del nombre visible.
- Agrupa el mismo juego en una sola fila usando:
  - D: precio general
  - E: precio PS4
  - F: precio PS5
- Completa columna N con ficha comercial AREA 51.
- Reemplaza descripciones genéricas o incompletas.
- Conserva descripciones completas existentes.
- Mantiene trailers existentes y, si falta, coloca búsqueda cerrada en GameTrailers.

## Importante

Esta V5 NO destruye la lógica de la V2/V3/V4. Solo mejora el generador de descripción.

Para descripciones 100% verificadas juego por juego desde PlayStation Store, Steam, IGDB o Metacritic hace falta conectar una API/IA externa. Esta versión deja fichas completas comerciales y reemplaza los textos genéricos vacíos.

## Deploy

1. Subir carpeta a GitHub.
2. Importar en Vercel.
3. Framework: Other / Static.
4. Deploy.
