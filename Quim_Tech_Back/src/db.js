const path = require('node:path')
const fs = require('node:fs')
const crypto = require('node:crypto')
const { DatabaseSync } = require('node:sqlite')

const DATA_DIR = path.join(__dirname, '..', 'data')
const DB_PATH = path.join(DATA_DIR, 'quimtech.sqlite')

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const db = new DatabaseSync(DB_PATH)

db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TEXT NOT NULL
  )
`)

const seedCount = db.prepare('SELECT COUNT(*) AS count FROM reviews').get().count
if (seedCount === 0) {
  db.prepare(
    `INSERT INTO reviews (id, name, rating, comment, status, created_at)
     VALUES (?, ?, ?, ?, 'approved', ?)`,
  ).run(
    crypto.randomUUID(),
    "Rosa D'Água",
    5,
    'A Quim Tech entregou nosso site institucional com uma qualidade impressionante: rápido, bonito e no prazo combinado. O suporte durante todo o processo foi atencioso e técnico. Recomendamos de olhos fechados.',
    new Date().toISOString(),
  )
}

module.exports = db
