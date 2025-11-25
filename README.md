# API Números Romanos

Endpoints:

- `GET /a2r?arabic=123` → `{"roman":"CXXIII"}` (200)
- `GET /r2a?roman=CXXIII` → `{"arabic":123}` (200)
- Si faltan parámetros o son inválidos → JSON de error con estado 400.

La API está implementada con Node.js + Express y funciona correctamente en local (ver capturas).

Intenté desplegarla en Vercel usando el repositorio obligatorio
`Despliegue-I-2025/numeros-romanos-Lauty-ware`, con:

- carpeta `/api` (a2r.js y r2a.js)
- `vercel.json` con rewrites de `/a2r` y `/r2a` hacia `/api/a2r` y `/api/r2a`

Pero Vercel devuelve 404 sobre `/a2r` en este repo específico, posiblemente por configuración de root directory o del proyecto compartido. El código de la API está probado y funcionando en local.
