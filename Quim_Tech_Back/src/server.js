// Entrypoint apenas para desenvolvimento local (`npm run dev` / `npm start`).
// Em produção na Vercel, quem serve a aplicação é api/index.js — funções
// serverless não ficam "escutando" uma porta, então o app.listen() daqui
// nunca roda lá.
// .env.local (gerado por `vercel env pull`) tem prioridade; .env cobre o resto.
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env.local') })
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env') })
const app = require('./app')

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Quim Tech backend rodando em http://localhost:${PORT}`)
})
