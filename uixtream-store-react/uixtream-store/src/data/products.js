import bannerExternal from '../assets/banner-external.jpg'
import bannerLegit from '../assets/banner-legit.jpg'

// Orden de los planes y de los precios (USD)
export const PLANS = ['1 día', '7 días', '1 mes', '3 meses']

export const PRODUCTS = [
  {
    id: 'external',
    name: 'UX External Aim',
    badge: 'SAFE',
    banner: bannerExternal,
    short: 'Mueve el mouse a través de una consola. Bypass totalmente externo. Máxima fluidez y seguridad para tus partidas.',
    description:
      'La herramienta definitiva para dominar con máxima precisión. Mueve el mouse a través de una consola, garantizando un bypass totalmente externo. Incluye humanizador, selector de hitbox y control de recoil adaptable. 100% libre de inyecciones a la memoria del juego.',
    features: [
      'Mueve el mouse a través de una consola',
      'Bypass totalmente externo',
      'Humanizador',
      'Selector de hitbox',
      'Control de recoil adaptable',
      'Sin inyecciones a la memoria del juego',
    ],
    prices: [3, 10, 20, 45],
  },
  {
    id: 'legit',
    name: 'UX Legit Web',
    badge: 'UNDETECTED',
    banner: bannerLegit,
    short: 'Interfaz web integrada. Ignore Health/Team check, Box Type y ESP Max distance configurable al milímetro.',
    description:
      "Diseñado para parecer un jugador profesional. Interfaz web fácil de usar con opciones de 'Ignore Health Check' e 'Ignore Team Check'. Configura el tipo de cajas (Box Type), la posición de las líneas y personaliza el ESP Max Distance hasta 200.0 metros.",
    features: [
      'Interfaz web fácil de usar',
      'Ignore Health Check',
      'Ignore Team Check',
      'Box Type configurable',
      'Posición de las líneas',
      'ESP Max Distance hasta 200.0 metros',
    ],
    prices: [3.5, 12, 25, 55],
  },
  {
    id: 'radar',
    name: 'UX Radar Pro',
    badge: '2D WEB',
    short: 'Radar 2D externo accesible desde tu teléfono o segundo monitor. Ventaja táctica sin inyectar nada en el juego.',
    description:
      'Obtén la ventaja de visión total sin alterar tu cliente de juego. Genera un enlace local para ver el mapa 2D en tu celular, tablet o segundo monitor. Muestra enemigos, loot de alto valor y direcciones de mirada en tiempo real.',
    features: [
      'Enlace local para ver el mapa 2D',
      'Funciona en celular, tablet o segundo monitor',
      'Muestra enemigos, loot de alto valor y direcciones de mirada',
      'Tiempo real, sin alterar tu cliente de juego',
    ],
    prices: [2, 7, 15, 30],
  },
  {
    id: 'spoofer',
    name: 'UX HWID Spoofer',
    badge: 'CLEANER',
    short: 'Elimina baneos de hardware de forma permanente. Limpia traces y cambia tus seriales con un solo clic.',
    description:
      'Vuelve a jugar después de una suspensión de hardware. Limpia profundamente los archivos de rastreo (traces), registros del sistema operativo y modifica dinámicamente los seriales de tus discos, placa base y adaptadores de red. Seguro y estable.',
    features: [
      'Limpia archivos de rastreo (traces)',
      'Limpia registros del sistema operativo',
      'Cambia seriales de discos, placa base y adaptadores de red',
      'Para volver a jugar tras una suspensión de hardware',
    ],
    prices: [4, 15, 30, 65],
  },
]

export const money = (n) => `$${n.toFixed(2)}`
