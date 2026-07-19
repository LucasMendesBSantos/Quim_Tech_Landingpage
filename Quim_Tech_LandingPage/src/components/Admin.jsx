import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { deleteReview, getAllReviews, setReviewStatus } from '../lib/reviews'
import StarRating from './StarRating'

const SESSION_KEY = 'quimtech_admin_session'
const ADMIN_USER = 'quimtechadmin'
const ADMIN_PASS = 'quimtechadmin'

const STATUS_LABEL = {
  pending: 'Pendente',
  approved: 'Aprovada',
  rejected: 'Recusada',
}

const STATUS_TONE = {
  pending: 'bg-amber-400/15 text-amber-300',
  approved: 'bg-teal-light/15 text-teal-light',
  rejected: 'bg-red-400/15 text-red-300',
}

function LoginScreen({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      onLogin()
    } else {
      setError('Usuário ou senha inválidos.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-navy/40 p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Quim Tech" className="h-14 w-14 rounded-2xl object-contain" />
          <h1 className="mt-4 text-xl font-extrabold text-ink">Painel Administrativo</h1>
          <p className="mt-1 text-sm text-muted">Acesso restrito à equipe Quim Tech.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-user" className="text-xs font-semibold uppercase tracking-wide text-muted">
              Usuário
            </label>
            <input
              id="admin-user"
              type="text"
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-cyan/50"
            />
          </div>
          <div>
            <label htmlFor="admin-pass" className="text-xs font-semibold uppercase tracking-wide text-muted">
              Senha
            </label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-cyan/50"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-cyan to-royal px-5 py-3 text-sm font-semibold text-void shadow-lg shadow-cyan/20 transition-transform hover:scale-[1.02]"
          >
            Entrar
          </button>
        </form>

        <a href="/" className="mt-6 block text-center text-xs text-muted hover:text-cyan-light">
          &larr; Voltar para o site
        </a>
      </div>
    </div>
  )
}

function Dashboard({ onLogout }) {
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState('pending')

  const refresh = () => setReviews(getAllReviews())
  useEffect(refresh, [])

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.status === filter)
  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
  }

  function handleStatus(id, status) {
    setReviews(setReviewStatus(id, status))
  }

  function handleDelete(id) {
    if (window.confirm('Excluir esta avaliação permanentemente?')) {
      setReviews(deleteReview(id))
    }
  }

  return (
    <div className="min-h-screen bg-void">
      <header className="border-b border-white/10 bg-navy/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Quim Tech" className="h-9 w-9 rounded-xl object-contain" />
            <span className="text-sm font-bold text-ink">Painel Administrativo</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-xs text-muted hover:text-cyan-light">
              Ver site
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-mist hover:border-white/20 hover:text-ink"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-extrabold text-ink">Avaliações de clientes</h1>
        <p className="mt-1 text-sm text-muted">
          Aprove as avaliações enviadas pelo site para que passem a aparecer publicamente na seção de cases de
          sucesso.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ['pending', 'Pendentes'],
            ['approved', 'Aprovadas'],
            ['rejected', 'Recusadas'],
            ['all', 'Todas'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                filter === key ? 'bg-cyan/20 text-cyan-light' : 'bg-white/[0.03] text-muted hover:text-ink'
              }`}
            >
              {label} ({counts[key]})
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filtered.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-muted">
              Nenhuma avaliação nesta categoria.
            </p>
          )}

          {filtered.map((review) => (
            <div key={review.id} className="rounded-2xl border border-white/10 bg-navy/40 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-ink">{review.name}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_TONE[review.status]}`}>
                      {STATUS_LABEL[review.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{new Date(review.createdAt).toLocaleString('pt-BR')}</p>
                  <div className="mt-2">
                    <StarRating value={review.rating} size="sm" />
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">{review.comment}</p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {review.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleStatus(review.id, 'approved')}
                      className="rounded-full bg-teal-light/15 px-4 py-1.5 text-xs font-semibold text-teal-light hover:bg-teal-light/25"
                    >
                      Aprovar
                    </button>
                  )}
                  {review.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleStatus(review.id, 'rejected')}
                      className="rounded-full bg-amber-400/15 px-4 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-400/25"
                    >
                      Recusar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(review.id)}
                    className="rounded-full bg-red-400/15 px-4 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-400/25"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setLoggedIn(false)
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />
  }

  return <Dashboard onLogout={handleLogout} />
}
