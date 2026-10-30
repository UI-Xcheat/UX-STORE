// Cloudflare Worker: recibe el comprobante desde la web y lo publica en #tickets.
// Secretos (wrangler secret put DISCORD_WEBHOOK_URL): URL del webhook del canal.
const ALLOWED_ORIGIN = 'https://ui-xcheat.github.io'
const MAX_BYTES = 5 * 1024 * 1024

const cors = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const reply = (status, text) => new Response(text, { status, headers: cors })
const clean = (v, max) => String(v ?? '').replace(/[`@\n\r]/g, ' ').slice(0, max)

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return reply(204, '')
    if (request.method !== 'POST') return reply(405, 'Method not allowed')
    if (request.headers.get('Origin') !== ALLOWED_ORIGIN) return reply(403, 'Forbidden')

    const form = await request.formData()
    const file = form.get('receipt')
    if (!(file instanceof File) || !file.type.startsWith('image/') || file.size > MAX_BYTES) {
      return reply(400, 'Invalid receipt')
    }

    const embed = {
      title: '🧾 Nuevo comprobante de pago',
      color: 0x57f287,
      fields: [
        { name: 'Producto', value: clean(form.get('product'), 60), inline: true },
        { name: 'Plan', value: clean(form.get('plan'), 30), inline: true },
        { name: 'Monto', value: `$${clean(form.get('price'), 10)} USD`, inline: true },
        { name: 'Método', value: clean(form.get('method'), 40), inline: true },
        { name: 'Discord del cliente', value: clean(form.get('discord'), 40) || '—', inline: true },
      ],
      image: { url: 'attachment://receipt.png' },
      timestamp: new Date().toISOString(),
    }

    const out = new FormData()
    out.set('payload_json', JSON.stringify({ embeds: [embed], allowed_mentions: { parse: [] } }))
    out.set('files[0]', file, 'receipt.png')

    try {
      const res = await fetch(String(env.DISCORD_WEBHOOK_URL ?? '').trim(), { method: 'POST', body: out })
      return reply(res.ok ? 200 : 502, res.ok ? 'ok' : `Discord error ${res.status}`)
    } catch (err) {
      return reply(500, `Worker error: ${err.message.slice(0, 20)}`)
    }
  },
}

