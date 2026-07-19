import { useEffect, useState } from 'react'
import { getApprovedReviews, submitReview } from '../lib/api'
import Reveal from './Reveal'
import StarRating from './StarRating'
import TestimonialsCarousel from './TestimonialsCarousel'

const CAROUSEL_THRESHOLD = 3

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function ReviewCard({ review, delay = 0 }) {
  return (
    <Reveal
      as="div"
      delay={delay}
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy/40 p-6 transition-all hover:-translate-y-1 hover:border-white/20"
    >
      <StarRating value={review.rating} size="sm" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">&ldquo;{review.comment}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-royal text-xs font-extrabold text-void">
          {initials(review.name)}
        </div>
        <div>
          <p className="text-sm font-bold text-ink">{review.name}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loadError, setLoadError] = useState(false)
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    getApprovedReviews()
      .then(setReviews)
      .catch(() => setLoadError(true))
  }, [])

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim()) {
      setError('Preencha seu nome e um comentário antes de enviar.')
      return
    }
    setSending(true)
    setError('')
    try {
      await submitReview(form)
      setSubmitted(true)
      setForm({ name: '', rating: 5, comment: '' })
    } catch (err) {
      setError(err.message || 'Não foi possível enviar sua avaliação agora. Tente novamente em instantes.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="avaliacoes" className="relative scroll-mt-28 bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Cases de Sucesso</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            O que nossos <span className="text-gradient">clientes dizem</span>
          </h2>
          {reviews.length > 0 && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <StarRating value={Math.round(Number(average))} size="sm" />
              <span className="text-sm font-semibold text-ink">{average} / 5</span>
              <span className="text-sm text-muted">({reviews.length} avalia{reviews.length === 1 ? 'ção' : 'ções'})</span>
            </div>
          )}
        </Reveal>

        {loadError && (
          <p className="mx-auto mt-10 max-w-md text-center text-sm text-muted">
            Não foi possível carregar as avaliações no momento. Tente novamente mais tarde.
          </p>
        )}

        {!loadError && reviews.length > CAROUSEL_THRESHOLD && (
          <div className="mt-16">
            <TestimonialsCarousel reviews={reviews} />
          </div>
        )}

        {!loadError && reviews.length > 0 && reviews.length <= CAROUSEL_THRESHOLD && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} delay={(i % 3) * 100} />
            ))}
          </div>
        )}

        <Reveal className="mx-auto mt-16 max-w-xl rounded-3xl border border-cyan/25 bg-gradient-to-b from-cyan/[0.06] to-transparent p-8 sm:p-10">
          <h3 className="text-xl font-extrabold text-ink">Encomendou um projeto com a gente?</h3>
          <p className="mt-2 text-sm text-mist">
            Deixe sua avaliação sobre o site ou consultoria que você contratou. Depois de uma breve validação da
            nossa equipe, ela aparece aqui para outros visitantes.
          </p>

          {submitted ? (
            <div className="mt-6 rounded-2xl border border-teal-light/30 bg-teal-light/10 p-5 text-sm text-teal-light">
              Obrigado pela sua avaliação! Ela foi registrada e será publicada assim que for validada pela nossa
              equipe.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="review-name" className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Seu nome ou empresa
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-cyan/50"
                  placeholder="Ex: Rosa D'Água"
                />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">Quantas estrelas nós merecemos?</span>
                <div className="mt-1.5">
                  <StarRating value={form.rating} onChange={(rating) => setForm((f) => ({ ...f, rating }))} size="lg" />
                </div>
              </div>

              <div>
                <label htmlFor="review-comment" className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Sua opinião sobre o projeto
                </label>
                <textarea
                  id="review-comment"
                  rows={4}
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-cyan/50"
                  placeholder="Conte como foi sua experiência com a Quim Tech..."
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-gradient-to-r from-cyan to-royal px-5 py-3 text-sm font-semibold text-void shadow-lg shadow-cyan/20 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Enviando...' : 'Enviar avaliação'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
