# Worker de comprobantes → Discord #tickets

1. En Discord: canal **#tickets** → Editar canal → Integraciones → Webhooks → Nuevo webhook → Copiar URL.
2. `cd worker`
3. `npx wrangler login`
4. `npx wrangler secret put DISCORD_WEBHOOK_URL` (pega la URL del webhook)
5. `npx wrangler deploy` → te da una URL `https://ux-store-receipts.<tu-cuenta>.workers.dev`
6. Pega esa URL en `RECEIPT_ENDPOINT` de `src/data/payments.js` y haz push.

Nunca pongas la URL del webhook en el código de la web: cualquiera podría usarla para hacer spam.
