import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

const LINKS = [
  { href: '#tech', label: 'Soluções Tech' },
  { href: '#quimica', label: 'Consultoria Química' },
  { href: '#sobre', label: 'Sobre Nós' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#avaliacoes', label: 'Avaliações' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-void/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Quim Tech" className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11" />
          <span className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">
            <span className="text-cyan-light">Quim</span>Tech
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-mist transition-colors hover:text-cyan-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contato"
            className="rounded-full bg-gradient-to-r from-cyan to-royal px-5 py-2.5 text-sm font-semibold text-void shadow-lg shadow-cyan/20 transition-transform hover:scale-105"
          >
            Fale Conosco
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
            ) : (
              <path d="M2.5 5h15M2.5 10h15M2.5 15h15" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-void/95 px-6 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-mist hover:bg-white/5 hover:text-cyan-light"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-cyan to-royal px-5 py-3 text-center text-sm font-semibold text-void"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
