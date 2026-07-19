const crypto = require('node:crypto')

const ADMIN_USER = process.env.ADMIN_USER || 'quimtechadmin'
const ADMIN_PASS = process.env.ADMIN_PASS || 'quimtechadmin'
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'dev-only-insecure-secret-change-me'
const SESSION_TTL_MS = 12 * 60 * 60 * 1000 // 12 horas

// Em serverless (Vercel) cada requisição pode cair numa instância de função
// diferente, então não dá pra guardar sessões em memória (Map) como antes —
// a próxima chamada podia cair numa instância "fria" que nunca viu o login.
// Por isso o token aqui é autocontido: carrega a validade assinada com HMAC,
// e qualquer instância consegue validar sozinha, sem estado compartilhado.

if (process.env.VERCEL && !process.env.ADMIN_TOKEN_SECRET) {
  console.warn(
    'ADMIN_TOKEN_SECRET não definido em produção — defina essa variável nas Environment Variables da Vercel com um valor aleatório e longo.',
  )
}

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

function sign(payloadB64) {
  return crypto.createHmac('sha256', TOKEN_SECRET).update(payloadB64).digest('base64url')
}

function login(username, password) {
  if (username !== ADMIN_USER || password !== ADMIN_PASS) return null
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })
  const payloadB64 = base64url(payload)
  return `${payloadB64}.${sign(payloadB64)}`
}

function isValidToken(token) {
  if (!token || !token.includes('.')) return false
  const [payloadB64, signature] = token.split('.')
  if (!payloadB64 || !signature) return false

  const expected = sign(payloadB64)
  const sigBuf = Buffer.from(signature)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return false

  try {
    const { exp } = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!isValidToken(token)) {
    return res.status(401).json({ error: 'Não autorizado.' })
  }
  next()
}

module.exports = { login, requireAuth }
