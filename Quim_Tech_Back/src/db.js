const crypto = require('node:crypto')
const { neon } = require('@neondatabase/serverless')

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!connectionString) {
  throw new Error(
    'DATABASE_URL/POSTGRES_URL não definida. Rode `vercel env pull .env.local` ou configure o banco Postgres do projeto.',
  )
}

// Driver HTTP da Neon: cada query é uma requisição, sem conexão TCP persistente.
// É o que faz sentido numa função serverless (cada invocação é curta e pode
// rodar numa instância diferente a qualquer momento).
const sql = neon(connectionString)

// Cacheado por processo: a primeira invocação de uma instância "fria" garante
// que a tabela existe; invocações seguintes na mesma instância reaproveitam
// a promise já resolvida.
let schemaReady = null
function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS reviews (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
          comment TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `

      const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM reviews`
      if (count === 0) {
        await sql`
          INSERT INTO reviews (id, name, rating, comment, status)
          VALUES (
            ${crypto.randomUUID()},
            ${"Rosa D'Água"},
            5,
            ${'A Quim Tech entregou nosso site institucional com uma qualidade impressionante: rápido, bonito e no prazo combinado. O suporte durante todo o processo foi atencioso e técnico. Recomendamos de olhos fechados.'},
            'approved'
          )
        `
      }
    })()
  }
  return schemaReady
}

module.exports = { sql, ensureSchema }
