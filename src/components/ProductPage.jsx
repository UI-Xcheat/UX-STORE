import { useEffect, useRef, useState } from 'react'
import Art from './Art.jsx'
import PaymentModal from './PaymentModal.jsx'
import emblem from '../assets/emblema-negro.png'
import { PLANS, PRODUCTS, money } from '../data/products.js'

export default function ProductPage({ product, onBack }) {
  const [plan, setPlan] = useState(null) // índice del plan elegido → abre el pago
  const title = useRef(null)
  useEffect(() => title.current?.focus({ preventScroll: true }), [])

  return (
    <>
      <nav className="top">
        <button type="button" className="ghost" onClick={onBack}>← Tienda</button>
        <img src={emblem} alt="UiXtream" />
      </nav>

      <div className="pg">
        <section className="frame">
          <div className="in info">
            <Art product={product} index={PRODUCTS.indexOf(product)} />
            <h1 ref={title} tabIndex={-1} className="chromet">{product.name}</h1>
            <h3>¿Qué es?</h3>
            <p>{product.description}</p>
            <h3>Incluye</h3>
            <ul>
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="frame stk">
          <div className="in price">
            <h3>Escoge tu licencia</h3>
            <p>Al elegir una, se abre la ventana con los métodos de pago.</p>
            {product.perks && (
              <ul className="perks">
                {product.perks.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
            {PLANS.map((label, k) => (
              <button key={label} type="button" className="plan" onClick={() => setPlan(k)}>
                <span>{label}</span>
                <b>{money(product.prices[k])}</b>
              </button>
            ))}
          </div>
        </aside>
      </div>

      {plan !== null && <PaymentModal product={product} plan={plan} onClose={() => setPlan(null)} />}
    </>
  )
}
