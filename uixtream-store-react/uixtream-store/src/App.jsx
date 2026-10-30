import { useEffect } from 'react'
import { useRoute } from './hooks/useRoute.js'
import { PRODUCTS } from './data/products.js'
import Home from './components/Home.jsx'
import ProductPage from './components/ProductPage.jsx'

export default function App() {
  const [route, go] = useRoute()
  const product = PRODUCTS.find((p) => p.id === route)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${product ? product.name + ' | ' : ''}UiXtream | Premium Tools`
  }, [product])

  return product ? (
    <ProductPage key={product.id} product={product} onBack={() => go('')} />
  ) : (
    <Home onOpen={go} />
  )
}
