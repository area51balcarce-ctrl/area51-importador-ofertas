# AREA 51 - Importador de Ofertas

Herramienta interna para actualizar el Excel descargado desde la web de AREA 51 sin tocar productos físicos.

## Flujo

1. Exportar/descargar el Excel desde la web.
2. Abrir esta herramienta.
3. Subir el Excel.
4. Pegar el listado nuevo de juegos/ofertas/preventas.
5. Presionar **Generar Excel actualizado**.
6. Importar el Excel generado en la web.

## Reglas aplicadas

- No toca productos físicos.
- Elimina solo filas cuya categoría sea `Juegos`.
- Carga únicamente los juegos del listado pegado.
- Deja ID vacío para que la web genere el ID.
- Quita PS4 / PS5 / PS4-PS5 del nombre para evitar duplicados.
- Moneda: ARS.
- Oferta: SI.
- Preventa: SI cuando corresponda.
- Fecha de lanzamiento en columna M cuando venga en el listado.
- Reutiliza descripciones y trailers existentes si el nombre coincide.
- Si falta trailer, coloca búsqueda interna del canal GameTrailers.

## Instalar en Vercel

```bash
npm install
npm run dev
```

Subir a GitHub y conectar el repo en Vercel.

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```
