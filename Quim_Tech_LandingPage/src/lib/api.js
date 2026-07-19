const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const TOKEN_KEY = 'quimtech_admin_token'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    let message = `Erro ${res.status}`
    try {
      const body = await res.json()
      if (body?.error) message = body.error
    } catch {
      // resposta sem corpo JSON (ex: 401 genérico)
    }
    throw new Error(message)
  }

  if (res.status === 204) return null
  return res.json()
}

// --- Público ---

export function getApprovedReviews() {
  return request('/api/reviews')
}

export function submitReview({ name, rating, comment }) {
  return request('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({ name, rating, comment }),
  })
}

// --- Admin ---

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export async function adminLogin(username, password) {
  const { token } = await request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  sessionStorage.setItem(TOKEN_KEY, token)
  return token
}

export function adminLogout() {
  const token = getAdminToken()
  sessionStorage.removeItem(TOKEN_KEY)
  if (token) {
    request('/api/admin/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => {})
  }
}

function authHeaders() {
  const token = getAdminToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function getAllReviews() {
  return request('/api/admin/reviews', { headers: authHeaders() })
}

export function setReviewStatus(id, status) {
  return request(`/api/admin/reviews/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  })
}

export function deleteReview(id) {
  return request(`/api/admin/reviews/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}
