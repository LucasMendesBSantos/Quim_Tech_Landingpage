const express = require('express')
const rateLimit = require('express-rate-limit')
const reviews = require('./reviews.model')
const auth = require('./auth')

const router = express.Router()

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas avaliações enviadas. Tente novamente mais tarde.' },
})

function validateReviewInput(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const comment = typeof body.comment === 'string' ? body.comment.trim() : ''
  const rating = Number(body.rating)

  if (!name || name.length > 120) return 'Nome inválido.'
  if (!comment || comment.length > 2000) return 'Comentário inválido.'
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return 'Avaliação em estrelas inválida.'
  return null
}

// --- Rotas públicas ---

router.get('/reviews', async (req, res) => {
  res.json(await reviews.listApproved())
})

router.post('/reviews', submitLimiter, async (req, res) => {
  const error = validateReviewInput(req.body || {})
  if (error) return res.status(400).json({ error })

  const { name, comment } = req.body
  const rating = Number(req.body.rating)
  const review = await reviews.create({ name: name.trim(), rating, comment: comment.trim() })
  res.status(201).json(review)
})

// --- Autenticação admin ---

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  const token = auth.login(username, password)
  if (!token) return res.status(401).json({ error: 'Usuário ou senha inválidos.' })
  res.json({ token })
})

// Token é autocontido (sem estado no servidor) — "logout" é só o cliente
// esquecer o token dele; aqui só validamos que ele estava logado.
router.post('/admin/logout', auth.requireAuth, (req, res) => {
  res.status(204).end()
})

// --- Rotas administrativas (protegidas) ---

router.get('/admin/reviews', auth.requireAuth, async (req, res) => {
  res.json(await reviews.listAll())
})

router.patch('/admin/reviews/:id', auth.requireAuth, async (req, res) => {
  const { status } = req.body || {}
  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Status inválido.' })
  }
  const updated = await reviews.updateStatus(req.params.id, status)
  if (!updated) return res.status(404).json({ error: 'Avaliação não encontrada.' })
  res.json(updated)
})

router.delete('/admin/reviews/:id', auth.requireAuth, async (req, res) => {
  const deleted = await reviews.remove(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Avaliação não encontrada.' })
  res.status(204).end()
})

module.exports = router
