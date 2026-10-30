export const DISCORD = 'https://discord.gg/YOUR_INVITE_LINK'

// type "qr"   → círculo de carga y luego el QR (archivo en public/qr/)
// type "link" → ventana con botón que abre la página de pago
export const PAYMENTS = [
  { id: 'yape', name: 'Yape', icon: 'Y', type: 'qr', qr: 'qr/yape.png' },
  { id: 'plin', name: 'Plin', icon: 'P', type: 'qr', qr: 'qr/plin.png' },
  { id: 'nequi', name: 'Nequi', icon: 'N', type: 'qr', qr: 'qr/nequi.png' },
  { id: 'binance', name: 'Binance Pay', icon: 'B', type: 'qr', qr: 'qr/binance.png' },
  // amount: true agrega el monto al enlace → paypal.me/TU_USUARIO/20USD
  { id: 'paypal', name: 'PayPal', icon: 'PP', type: 'link', url: 'https://paypal.me/YOUR_PAYPAL', amount: true },
  { id: 'card', name: 'Tarjeta de crédito / débito', icon: 'CC', type: 'link', url: 'https://uistalin.gumroad.com/l/lhhsze' },
]
