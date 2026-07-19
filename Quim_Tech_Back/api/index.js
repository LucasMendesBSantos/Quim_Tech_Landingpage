// Entrypoint da Vercel: qualquer arquivo dentro de /api vira uma função
// serverless. A Vercel importa o app Express e o trata como um handler
// (req, res) — sem precisar de app.listen(), que só faz sentido localmente
// (veja src/server.js).
require('dotenv').config()
const app = require('../src/app')

module.exports = app
