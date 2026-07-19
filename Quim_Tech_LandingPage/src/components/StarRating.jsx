function Star({ filled, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" className={className}>
      <path
        d="M12 3.5l2.62 5.6 6.13.68-4.6 4.24 1.24 6.07L12 16.98l-5.4 3.11 1.24-6.07-4.6-4.24 6.13-.68z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function StarRating({ value, onChange, size = 'md' }) {
  const dim = size === 'lg' ? 'h-7 w-7' : size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'
  const interactive = typeof onChange === 'function'

  return (
    <div className={`flex items-center gap-1 text-cyan-light ${interactive ? '' : ''}`} role={interactive ? 'radiogroup' : undefined} aria-label="Avaliação em estrelas">
      {[1, 2, 3, 4, 5].map((n) =>
        interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
            onClick={() => onChange(n)}
            className="transition-transform hover:scale-110"
          >
            <Star filled={n <= value} className={dim} />
          </button>
        ) : (
          <Star key={n} filled={n <= value} className={dim} />
        ),
      )}
    </div>
  )
}
