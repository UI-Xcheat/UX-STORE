import { useEffect, useReducer, useRef, useState } from 'react'
import { DISCORD, PAYMENTS } from '../data/payments.js'
import { PLANS, money } from '../data/products.js'
import ReceiptForm from './ReceiptForm.jsx'

// Máquina de estados: methods → loading → qr   |   methods → link
const init = { step: 'methods', method: null }
function reducer(state, action) {
  switch (action.type) {
    case 'pick':
      return { step: action.method.type === 'qr' ? 'loading' : 'link', method: action.method }
    case 'ready':
      return state.step === 'loading' ? { ...state, step: 'qr' } : state
    case 'back':
      return init
    default:
      return state
  }
}

function QrBox({ method }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="qr">
      {failed ? (
        <div>QR de {method.name} pendiente</div>
      ) : (
        <img src={method.qr} alt={`QR de ${method.name}`} onError={() => setFailed(true)} />
      )}
    </div>
  )
}

const Discord = () => (
  <a className="dc" href={DISCORD} target="_blank" rel="noopener noreferrer">
    Enviar comprobante en Discord
  </a>
)

export default function PaymentModal({ product, plan, onClose }) {
  const ref = useRef(null)
  const [{ step, method }, dispatch] = useReducer(reducer, init)
  const price = product.prices[plan]

  // <dialog> nativo: focus trap, Escape y backdrop gratis
  useEffect(() => {
    const d = ref.current
    if (!d.open) d.showModal()
  }, [])

  // el círculo de carga dura 1.8 s y luego aparece el QR
  useEffect(() => {
    if (step !== 'loading') return
    const t = setTimeout(() => dispatch({ type: 'ready' }), 1800)
    return () => clearTimeout(t)
  }, [step])

  const payUrl = method?.type === 'link' ? method.url + (method.amount ? `/${price}USD` : '') : ''

  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && ref.current.close()} aria-labelledby="pay-title">
      <div className="frame">
        <div className="in dl">
          <button type="button" className="x" aria-label="Cerrar" onClick={() => ref.current.close()}>✕</button>
          <h3 id="pay-title">Método de pago</h3>
          <div className="sum">
            {product.name} · <b>{PLANS[plan]}</b> · <b>{money(price)}</b>
          </div>

          {step === 'methods' &&
            PAYMENTS.map((m) => (
              <button key={m.id} type="button" className="m" onClick={() => dispatch({ type: 'pick', method: m })}>
                <i>{m.icon}</i>
                {m.name}
                <span>&gt;&gt;</span>
              </button>
            ))}

          {step === 'loading' && (
            <div className="c">
              <div className="ring" role="status" aria-label="Cargando" />
              <p>Generando pago con {method.name}…</p>
            </div>
          )}

          {step === 'qr' && (
            <>
              <div className="c">
                <QrBox method={method} />
                <p>
                  Escanea con {method.name} y paga <b>{money(price)}</b>. Luego envía el comprobante al ticket.
                </p>
                <button type="button" className="back2" onClick={() => dispatch({ type: 'back' })}>← Cambiar método</button>
              </div>
              <ReceiptForm product={product} plan={plan} price={price} method={method} />
              <Discord />
            </>
          )}

          {step === 'link' && (
            <>
              <div className="c">
                <p>
                  Pagarás <b>{money(price)}</b> con {method.name} en una página segura. Al terminar, envía el comprobante al ticket.
                </p>
                <a className="btn" style={{ width: '100%' }} href={payUrl} target="_blank" rel="noopener noreferrer">
                  Ir a {method.name.split(' ')[0]}
                </a>
                <button type="button" className="back2" onClick={() => dispatch({ type: 'back' })}>← Cambiar método</button>
              </div>
              <ReceiptForm product={product} plan={plan} price={price} method={method} />
              <Discord />
            </>
          )}
        </div>
      </div>
    </dialog>
  )
}
