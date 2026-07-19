// Entrypoint apenas para desenvolvimento local (`npm run dev` / `npm start`).
// Em produção na Vercel, quem serve a aplicação é api/index.js — funções
// serverless não ficam "escutando" uma porta, então o app.listen() daqui
// nunca roda lá.
require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Quim Tech backend rodando em http://localhost:${PORT}`)
})
