import { useCallback, useEffect, useState } from 'react'

// Router mínimo: el estado de React manda; el hash de la URL es solo un extra
// (para el botón "atrás" y para compartir enlaces). Si el navegador bloquea
// el historial (iframes, vistas previas), la navegación sigue funcionando.
const read = () => decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))

export function useRoute() {
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const sync = () => setRoute(read())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  const go = useCallback((id = '') => {
    setRoute(id)
    try {
      window.history.pushState(null, '', id ? `#${id}` : window.location.pathname + window.location.search)
    } catch {
      /* historial bloqueado: ya navegamos por estado */
    }
  }, [])

  return [route, go]
}
