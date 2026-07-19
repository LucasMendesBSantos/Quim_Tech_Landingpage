import { useEffect, useRef, useState } from 'react'
import StarRating from './StarRating'

const GAP_PX = 24
const AUTO_PLAY_MS = 3200
const DRAG_CLICK_THRESHOLD = 6

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function Arrow({ direction, onClick, label }) {
  const isLeft = direction === 'left'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-void/80 text-ink backdrop-blur-md transition-all hover:border-cyan/40 hover:bg-void hover:text-cyan-light ${
        isLeft ? 'left-0 sm:-left-4' : 'right-0 sm:-right-4'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <path
          d={isLeft ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

function CarouselCard({ review }) {
  return (
    <div
      data-card
      className="group w-[280px] shrink-0 snap-start sm:w-[320px]"
      style={{ scrollSnapStop: 'always' }}
    >
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy/40 p-6 shadow-black/20 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.08] group-hover:border-cyan/30 group-hover:shadow-2xl">
        <StarRating value={review.rating} size="sm" />
        <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">&ldquo;{review.comment}&rdquo;</p>
        <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-royal text-xs font-extrabold text-void">
            {initials(review.name)}
          </div>
          <p className="text-sm font-bold text-ink">{review.name}</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsCarousel({ reviews }) {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })

  useEffect(() => {
    const track = trackRef.current
    if (!track || paused) return

    const id = setInterval(() => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        track.scrollBy({ left: getStep(track), behavior: 'smooth' })
      }
    }, AUTO_PLAY_MS)

    return () => clearInterval(id)
  }, [paused])

  function getStep(track) {
    const card = track.querySelector('[data-card]')
    return card ? card.getBoundingClientRect().width + GAP_PX : 320
  }

  function scrollByDirection(direction) {
    const track = trackRef.current
    if (!track) return
    const atEdge =
      direction > 0
        ? track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
        : track.scrollLeft <= 4
    if (atEdge) {
      track.scrollTo({ left: direction > 0 ? 0 : track.scrollWidth, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: direction * getStep(track), behavior: 'smooth' })
    }
  }

  function onPointerDown(e) {
    const track = trackRef.current
    if (!track) return
    dragState.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: 0 }
    track.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    const track = trackRef.current
    const state = dragState.current
    if (!track || !state.active) return
    const dx = e.clientX - state.startX
    state.moved = Math.max(state.moved, Math.abs(dx))
    track.scrollLeft = state.startScroll - dx
  }

  function onPointerUp(e) {
    const track = trackRef.current
    if (track) {
      try {
        track.releasePointerCapture(e.pointerId)
      } catch {
        // pointer já pode ter sido liberado
      }
    }
    dragState.current.active = false
  }

  // Roda do mouse move o carrossel na horizontal em vez de rolar a página.
  function onWheel(e) {
    const track = trackRef.current
    if (!track) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      track.scrollLeft += e.deltaY
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Arrow direction="left" label="Ver avaliação anterior" onClick={() => scrollByDirection(-1)} />
      <Arrow direction="right" label="Ver próxima avaliação" onClick={() => scrollByDirection(1)} />

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
        onClickCapture={(e) => {
          if (dragState.current.moved > DRAG_CLICK_THRESHOLD) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
        className="scrollbar-none flex cursor-grab touch-pan-y select-none gap-6 overflow-x-auto overflow-y-visible scroll-smooth px-1 py-4 [overscroll-behavior-x:contain] active:cursor-grabbing"
        style={{ scrollSnapType: 'x proximity' }}
      >
        {reviews.map((review) => (
          <CarouselCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
