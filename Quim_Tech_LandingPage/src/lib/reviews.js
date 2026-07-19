const STORAGE_KEY = 'quimtech_reviews'

// Cases de sucesso curados manualmente — sempre visíveis, não passam por moderação.
export const FEATURED_REVIEWS = [
  {
    id: 'featured-rosa-dagua',
    name: "Rosa D'Água",
    role: 'Cliente — Site Institucional',
    rating: 5,
    comment:
      'A Quim Tech entregou nosso Sistema de Gestão de Garrafões personalizados com uma qualidade impressionante: rápido, bonito e no prazo combinado, hoje, evita o gargalo de logistica dentro da industria. O suporte durante todo o processo foi atencioso e técnico. Recomendamos de olhos fechados.',
  },
]

function readReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeReviews(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
}

export function getAllReviews() {
  return readReviews().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getApprovedReviews() {
  return getAllReviews().filter((r) => r.status === 'approved')
}

export function submitReview({ name, rating, comment }) {
  const review = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    rating,
    comment: comment.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  writeReviews([review, ...readReviews()])
  return review
}

export function setReviewStatus(id, status) {
  const reviews = readReviews().map((r) => (r.id === id ? { ...r, status } : r))
  writeReviews(reviews)
  return reviews
}

export function deleteReview(id) {
  const reviews = readReviews().filter((r) => r.id !== id)
  writeReviews(reviews)
  return reviews
}
