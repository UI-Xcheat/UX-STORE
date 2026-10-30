import { useState } from 'react'
import { RECEIPT_ENDPOINT } from '../data/payments.js'
import { PLANS } from '../data/products.js'

const MAX_MB = 5

// Envía el comprobante al worker, que lo reenvía al canal #tickets de Discord.
// El webhook nunca vive en el navegador: solo el worker lo conoce.
export default function ReceiptForm({ product, plan, price, method }) {
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

  if (!RECEIPT_ENDPOINT) return null

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const file = form.elements.receipt.files[0]
    if (!file) return setError('Adjunta la captura del comprobante.') || setStatus('error')
    if (!file.type.startsWith('image/') || file.size > MAX_MB * 1024 * 1024) {
      setError(`La imagen debe pesar menos de ${MAX_MB} MB.`)
      return setStatus('error')
    }
    const body = new FormData()
    body.set('discord', form.elements.discord.value.trim())
    body.set('product', product.name)
    body.set('plan', PLANS[plan])
    body.set('price', price.toFixed(2))
    body.set('method', method.name)
    body.set('receipt', file)

    setStatus('sending')
    try {
      const res = await fetch(RECEIPT_ENDPOINT, { method: 'POST', body })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setError('No se pudo enviar. Inténtalo otra vez o usa el botón de Discord.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return <p className="rcpt-ok">✔ Comprobante enviado. Te atenderemos en Discord en breve.</p>
  }

  return (
    <form className="rcpt" onSubmit={submit}>
      <label>
        Tu usuario de Discord
        <input name="discord" required maxLength={40} placeholder="usuario" autoComplete="off" />
      </label>
      <label>
        Captura del comprobante
        <input name="receipt" type="file" accept="image/*" required />
      </label>
      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : 'Enviar comprobante'}
      </button>
      {status === 'error' && <p className="rcpt-err" role="alert">{error}</p>}
    </form>
  )
}
