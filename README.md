# Avance-back
# SPEED-MERCHANTS

┌─────────────────────┐         ┌─────────────────────┐
│     FRONTEND        │         │      BACKEND        │
│   (React + Vite)    │◄───────►│  (Node.js + Express)│
│                     │  HTTP   │                     │
│  - Context API      │  REST   │  - JWT Auth         │
│  - React Router     │         │  - Controllers      │
│  - Bootstrap        │         │  - Models           │
└─────────────────────┘         └──────────┬──────────┘
│
▼






    PostgreSQL   - --->
│  - usuarios         │
│  - productos        │
│  - ventas           │
│  - detalle_venta    │
└─────────────────────┘


### Flujo principal:
1. El usuario interactúa con el **Frontend** (React).
2. El Frontend hace peticiones a la **API** del Backend (`/api/...`).
3. El Backend valida el token JWT (si es necesario).
4. El Backend consulta o modifica la base de datos **PostgreSQL**.
5. La respuesta vuelve al Frontend y se actualiza la interfaz.

## ⚙️ Variables de Entorno

### Backend (`.env`)

Crea un archivo `.env` dentro de la carpeta `SpeedMerchants-backend` con el siguiente contenido:

```env
PORT=3001
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña
DB_NAME=speed-merchants
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=tu_secreto_super_seguro
