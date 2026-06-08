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


## Mejora PS4 / PS5 sin duplicados

El importador ahora agrupa automáticamente juegos con el mismo nombre oficial:

- Columna D: precio general cuando el juego está para ambas plataformas al mismo precio o no se indica plataforma.
- Columna E: precio PS4 cuando PS4 tiene valor propio.
- Columna F: precio PS5 cuando PS5 tiene valor propio.

Ejemplo:

```txt
GOD OF WAR RAGNAROK PS4 $20.000
GOD OF WAR RAGNAROK PS5 $30.000
```

Resultado: una sola fila con nombre `GOD OF WAR RAGNAROK`, precio PS4 en E y precio PS5 en F.

Si aparece:

```txt
GTA V PS4-PS5 $32.000
```

Resultado: una sola fila con precio general en D.

Regla: no se duplican filas por plataforma.


## V3 - Descripciones automáticas

Mejora agregada sin romper la V2:

- Mantiene productos físicos intactos.
- Mantiene ID vacío para juegos.
- Mantiene agrupación por plataforma usando D/E/F.
- Reutiliza descripciones existentes cuando el Excel ya las trae.
- Si falta descripción, completa columna N con formato AREA 51.
- Reutiliza trailers existentes y, si falta, deja búsqueda en GameTrailers.

Regla madre: no se modifica lo que funciona; solo se agrega autocompletado de descripción.
