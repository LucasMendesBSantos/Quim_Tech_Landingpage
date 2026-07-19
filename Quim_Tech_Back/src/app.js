const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

const app = express()

app.use(cors({ origin: FRONTEND_ORIGIN }))
app.use(express.json())
app.use('/api', routes)

app.get('/health', (req, res) => res.json({ status: 'ok' }))

module.exports = app
