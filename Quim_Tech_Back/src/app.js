const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

const app = express()

app.use(cors({ origin: FRONTEND_ORIGIN }))
app.use(express.json())
app.use('/api', routes)

app.get('/', (req, res) => res.json({ status: 'ok', message: "API Garrafão Rosa D'água online" }))
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Express 5 encaminha automaticamente erros de handlers async (promise
// rejeitada) pra cá — sem isso, o cliente receberia o HTML de erro padrão
// do Express em vez de JSON.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Erro interno do servidor.' })
})

module.exports = app
