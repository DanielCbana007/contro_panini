# Panini Album 2026 - Backend API

API REST para control de láminas Panini del Mundial de Fútbol 2026.

## 🌐 URL en producción

```
https://contro-panini-api.onrender.com
```

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
git clone https://github.com/DanielCbana007/contro_panini.git
cd contro_panini
npm install
```

## Iniciar servidor

```bash
npm start
```

El servidor corre en `http://localhost:3000`.  
La BD se **puebla automáticamente** al iniciar si está vacía (106 láminas).

Para desarrollo con recarga automática:

```bash
npm run dev
```

Para poblar la BD manualmente (opcional):

```bash
npm run seed
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=postgresql://usuario:password@host:puertobasededatos?sslmode=require
PORT=3000
```

| Variable | Obligatorio | Descripción |
|----------|-------------|-------------|
| `DATABASE_URL` | Sí | URL de conexión a PostgreSQL |
| `PORT` | No (default: `3000`) | Puerto del servidor |

## Endpoints

### Estado

```
GET /api/status
```

Respuesta: `{ "status": "ok", "app": "Panini Album 2026 API" }`

---

### Láminas obtenidas

```
GET /api/stickers/obtained
```

Devuelve todas las láminas marcadas como obtenidas.

---

### Láminas pendientes

```
GET /api/stickers/pending
```

Devuelve todas las láminas que aún no se han conseguido.

---

### Láminas repetidas

```
GET /api/stickers/repeated
```

Devuelve las láminas que tienen al menos 1 repetida, incluyendo la cantidad en el campo `repeated`.

---

### Registrar lámina

```
POST /api/stickers/register
Content-Type: application/json

{
  "code": "ARG-3"
}
```

- Si la lámina **no estaba obtenida** → se marca como obtenida.
- Si **ya estaba obtenida** → se incrementa el contador `repeated` en 1.

Respuestas:

```json
// Nueva
{ "message": "Lamina ARG-3 registrada como obtenida", "action": "new" }

// Repetida
{ "message": "Lamina ARG-3 ya la tenias, ahora tienes una repetida", "action": "repeated" }
```

---

### Intercambiar lámina repetida por una faltante

```
POST /api/stickers/exchange
Content-Type: application/json

{
  "repeatedCode": "ARG-3",
  "newCode": "ARG-4"
}
```

- Disminuye en 1 el contador `repeated` de la lámina entregada (`repeatedCode`).
- Marca como obtenida la lámina recibida (`newCode`).

Validaciones:
- `repeatedCode` debe tener `repeated > 0`.
- `newCode` no debe estar ya obtenida.
- Ambas deben existir en el álbum.

Respuesta:

```json
{
  "message": "Intercambio exitoso: diste ARG-3 (repetida) y recibiste ARG-4",
  "givenAway": "ARG-3",
  "received": "ARG-4"
}
```

---

### Buscar jugador por nombre

```
GET /api/players/search?name=Cristiano%20Ronaldo
```

Consume la API de TheSportsDB y devuelve foto e información del jugador.

Respuesta:

```json
{
  "players": [
    {
      "id": "34146370",
      "name": "Cristiano Ronaldo",
      "nationality": "Portugal",
      "sport": "Soccer",
      "team": "Al Nassr",
      "position": "Centre-Forward",
      "birthDate": "1985-02-05",
      "birthPlace": "Funchal, Madeira",
      "description": "...",
      "photo": "https://r2.thesportsdb.com/images/media/player/thumb/...",
      "height": "1.87 m",
      "weight": "85 kg"
    }
  ]
}
```

Si no encuentra resultados:

```json
{ "players": [], "message": "No se encontraron jugadores" }
```

## Códigos de láminas disponibles

| Equipo | Códigos |
|--------|---------|
| Argentina | `ARG-1` a `ARG-16` |
| Brasil | `BRA-1` a `BRA-16` |
| España | `ESP-1` a `ESP-15` |
| Francia | `FRA-1` a `FRA-15` |
| Portugal | `POR-1` a `POR-15` |
| Alemania | `ALE-1` a `ALE-14` |
| Inglaterra | `ING-1` a `ING-15` |

## Repositorio

```
https://github.com/DanielCbana007/contro_panini
```

## Rubrica cubierta

| Requisito | Cumplido |
|-----------|----------|
| Consultar láminas obtenidas | `GET /api/stickers/obtained` |
| Consultar láminas pendientes | `GET /api/stickers/pending` |
| Consultar láminas repetidas con cantidades | `GET /api/stickers/repeated` |
| Registrar láminas obtenidas | `POST /api/stickers/register` |
| Intercambiar repetidas (descuenta inventario) | `POST /api/stickers/exchange` |
| Datos guardados en PostgreSQL | `pg` + Neon |
| Consume API TheSportsDB | `GET /api/players/search` |
