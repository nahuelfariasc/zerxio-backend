# Deploy de Strapi v4 en Render

Este documento resume los pasos para desplegar este proyecto en Render usando PostgreSQL.

## 1. Preparar servicios en Render

- **Backend (Web Service)**
  - Create New > Web Service > Connect a repo o usar Docker (si aplica).
  - Runtime: Node 18+ (Render suele usar LTS por defecto).
  - Build Command: `yarn install && yarn build` (o `npm ci && npm run build`).
  - Start Command: `yarn start` (o `npm run start`).

- **Base de datos (PostgreSQL)**
  - Create New > PostgreSQL.
  - Una vez creada, entra a la DB y ve a la pestaña **Connections** para copiar:
    - `External Database URL` (útil como `DATABASE_URL`).
    - Si Render muestra `?ssl=true` agrégalo en la URL. Si no aparece, agrega `?ssl=true` manualmente.

## 2. Variables de entorno

Configura estas variables en el Web Service de Render (Settings > Environment):

```
NODE_ENV=production
HOST=0.0.0.0
# PORT lo inyecta Render; no hace falta definirlo, pero puedes dejar 1337 localmente
URL=https://<tu-servicio>.onrender.com

DATABASE_CLIENT=postgres
DATABASE_URL=postgres://usuario:password@host:5432/mi_db?ssl=true
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT=60000
DATABASE_SCHEMA=public

APP_KEYS=clave1,clave2,clave3,clave4
API_TOKEN_SALT=xxxxxxxxxxxxxxxx
ADMIN_JWT_SECRET=xxxxxxxxxxxxxxxx
TRANSFER_TOKEN_SALT=xxxxxxxxxxxxxxxx
JWT_SECRET=xxxxxxxxxxxxxxxx
ENCRYPTION_KEY=xxxxxxxxxxxxxxxx

# CORS - agrega el dominio de tu frontend
CORS_ORIGINS=https://tu-frontend.com

# Opcional: desactivar telemetría
STRAPI_TELEMETRY_DISABLED=true
```

> Importante: genera secretos nuevos para producción. No utilices los de desarrollo.

## 3. Configuración del proyecto

- `config/server.js` ya fue ajustado para Render:
  - Añade `url` desde `URL` y `proxy: true`.
- `config/middlewares.js` permite configurar CORS desde `CORS_ORIGINS` y ajusta un CSP básico.
- `config/database.js` admite `DATABASE_URL` (recomendado en Render) y SSL por variables.

## 4. Build y primera ejecución

1. Realiza el deploy en Render (el primer build puede tardar).
2. Cuando el servicio levante, visita la URL pública de Render (`URL`) y crea el primer admin de Strapi.
3. Verifica que el panel admin funcione y que puedes crear/consultar contenido.

## 5. Notas de almacenamiento (upload)

Si planeas almacenar archivos en un servicio externo (S3, Cloudinary):
- Instala y configura el provider correspondiente (por ejemplo `@strapi/provider-upload-cloudinary`).
- Agrega las variables del provider en Render.
- Ajusta `config/plugins.js` para el provider de upload.

## 6. Troubleshooting

- **Error de SSL/CA**: si hay problemas de certificado, mantén `DATABASE_SSL_REJECT_UNAUTHORIZED=false`. Si tu proveedor exige CA, añade `DATABASE_SSL_CA` con el contenido del certificado (o apunta a un path si Render lo permite).
- **CORS bloqueando tu frontend**: añade el dominio del frontend a `CORS_ORIGINS`.
- **URLs absolutas incorrectas**: verifica `URL` y que `proxy: true` esté activo en `config/server.js`.
- **Migraciones/Permisos**: recuerda que en Strapi los permisos de roles (Public/Authenticated) se configuran desde el Admin Panel.

---

Para un ejemplo de variables, revisa `.env.render.example`.
