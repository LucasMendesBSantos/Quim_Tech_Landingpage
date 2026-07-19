const crypto = require('node:crypto')
const { sql, ensureSchema } = require('./db')

function rowToReview(row) {
  return {
    id: row.id,
    name: row.name,
    rating: row.rating,
    comment: row.comment,
    status: row.status,
    createdAt: row.created_at,
  }
}

async function listApproved() {
  await ensureSchema()
  const rows = await sql`SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC`
  return rows.map(rowToReview)
}

async function listAll() {
  await ensureSchema()
  const rows = await sql`SELECT * FROM reviews ORDER BY created_at DESC`
  return rows.map(rowToReview)
}

async function create({ name, rating, comment }) {
  await ensureSchema()
  const id = crypto.randomUUID()
  const [row] = await sql`
    INSERT INTO reviews (id, name, rating, comment, status)
    VALUES (${id}, ${name}, ${rating}, ${comment}, 'pending')
    RETURNING *
  `
  return rowToReview(row)
}

async function updateStatus(id, status) {
  await ensureSchema()
  const [row] = await sql`UPDATE reviews SET status = ${status} WHERE id = ${id} RETURNING *`
  return row ? rowToReview(row) : null
}

async function remove(id) {
  await ensureSchema()
  const rows = await sql`DELETE FROM reviews WHERE id = ${id} RETURNING id`
  return rows.length > 0
}

module.exports = { listApproved, listAll, create, updateStatus, remove }
