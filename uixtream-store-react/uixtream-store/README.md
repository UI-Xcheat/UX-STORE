# UiXtream Store (React + Vite)

    npm install
    npm run dev        # desarrollo
    npm run build      # genera dist/index.html (un solo archivo, abre con doble clic)

## Qué editar
- `src/data/products.js`  → productos, textos, features y precios (orden: 1 día, 7 días, 1 mes, 3 meses)
- `src/data/payments.js`  → enlace de Discord, PayPal, tarjeta y rutas de los QR
- `public/qr/`            → tus imágenes QR (yape.png, plin.png, nequi.png, binance.png)
- `src/styles.css`        → colores y estilo (variables en `:root`)

## Estructura
    src/
      main.jsx  App.jsx  styles.css
      hooks/useRoute.js            ruta con historial (sin librerías)
      data/                        products.js, payments.js
      components/                  Home, ProductCard, ProductPage, Art, PaymentModal
