import { memo } from 'react'
import Art from './Art.jsx'
import { money } from '../data/products.js'

function ProductCard({ product, index, onOpen }) {
  const open = (e) => {
    e.preventDefault()
    onOpen(product.id)
  }
  const Tag = product.soon ? 'div' : 'a'
  const props = product.soon
    ? { className: 'frame card disabled', 'aria-disabled': true }
    : { className: 'frame card', href: `#${product.id}`, onClick: open, 'aria-label': `Ver detalles de ${product.name}` }
  return (
    <Tag {...props}>
      <div className="in">
        <Art product={product} index={index}>
          <ul className="quick" aria-hidden="true">
            {product.features.slice(0, 3).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Art>
        <div className="body">
          <h2>{product.name}</h2>
          <p>{product.short}</p>
          <div className="foot">
            <div className="from">
              Desde <b>{money(product.prices[0])}</b>
            </div>
            <span className="cta">
              Ver detalles
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M4 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Tag>
  )
}

export default memo(ProductCard)
