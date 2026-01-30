# Nginx para el API (CORS)

Si el backend está detrás de Nginx (ej. `alivic-admisiones-api.desarrollo-software.xyz` → proxy a `localhost:3000`), Nginx **debe** reenviar las peticiones **OPTIONS** (preflight) al backend. Si Nginx responde a OPTIONS sin reenviar, el navegador no recibe los headers CORS y verás "blocked by CORS policy".

## Ejemplo de bloque server para el API

**Importante:** No respondas a OPTIONS desde Nginx (p. ej. con `return 204`). Las peticiones OPTIONS (preflight) deben llegar al backend para que NestJS devuelva 204 **con** los headers CORS.

```nginx
server {
    listen 80;
    server_name alivic-admisiones-api.desarrollo-software.xyz;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

No uses `add_header` para CORS en este bloque; el backend ya envía los headers CORS.

Tras cambiar la config: `sudo nginx -t && sudo systemctl reload nginx`.
