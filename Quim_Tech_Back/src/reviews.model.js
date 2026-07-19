const crypto = require('node:crypto')
const db = require('./db')

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

function listApproved() {
  const rows = db.prepare('SELECT * FROM reviews WHERE status = ? ORDER BY created_at DESC').all('approved')
  return rows.map(rowToReview)
}

function listAll() {
  const rows = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all()
  return rows.map(rowToReview)
}

function create({ name, rating, comment }) {
  const review = {
    id: crypto.randomUUID(),
    name,
    rating,
    comment,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  db.prepare(
    `INSERT INTO reviews (id, name, rating, comment, status, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(review.id, review.name, review.rating, review.comment, review.status, review.createdAt)
  return review
}

function updateStatus(id, status) {
  const result = db.prepare('UPDATE reviews SET status = ? WHERE id = ?').run(status, id)
  if (result.changes === 0) return null
  const row = db.prepare('SELECT * FROM reviews WHERE id = ?').get(id)
  return rowToReview(row)
}

function remove(id) {
  const result = db.prepare('DELETE FROM reviews WHERE id = ?').run(id)
  return result.changes > 0
}

module.exports = { listApproved, listAll, create, updateStatus, remove }
