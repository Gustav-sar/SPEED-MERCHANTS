```mermaid
graph TD
    subgraph Frontend (React + Vite)
        A[Interfaz de Usuario] --> B[Contexto API / React Router]
        B --> C[Bootstrap Styling]
    end

    subgraph Backend (Node.js + Express)
        D[Rutas / REST API] --> E[Controladores]
        E --> F[Modelos]
    end

    subgraph Base de Datos (PostgreSQL)
        G[(usuarios)]
        H[(productos)]
        I[(ventas)]
        J[(detalle_venta)]
    end

    C -- "Peticiones HTTP + JWT Auth" --> D
    F --> G
    F --> H
    F --> I
    F --> J
```

PORT=3001
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña
DB_NAME=speed-merchants
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=tu_secreto_super_seguro
