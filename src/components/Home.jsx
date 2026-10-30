import { PRODUCTS } from '../data/products.js'
import ProductCard from './ProductCard.jsx'
import spinningEmblem from '../assets/emblema-girando.gif'

export default function Home({ onOpen }) {
  return (
    <>
      <header className="hero">
        <img src={spinningEmblem} alt="Emblema UX" />
        <h1 className="chromet">UiXtream</h1>
        <p>Premium Gaming Software</p>
      </header>
      <div className="spikes" aria-hidden="true" />
      <main className="grid">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} />
        ))}
      </main>
    </>
  )
}
