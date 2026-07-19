import logo from '../assets/logo.png'
import HexField from './HexField'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-void via-abyss to-navy" />
      <HexField className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 animate-pulse-glow rounded-full bg-royal/25 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] animate-pulse-glow rounded-full bg-cyan/20 blur-3xl [animation-delay:1.2s]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-pulse-glow rounded-full bg-teal/15 blur-3xl [animation-delay:2.4s]" />

      {/* Faux terminal / molecule strokes */}
      <svg
        className="pointer-events-none absolute right-[6%] top-[18%] hidden h-[420px] w-[420px] animate-spin-slow opacity-30 md:block"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <ellipse cx="100" cy="100" rx="90" ry="34" stroke="#22b8e0" strokeWidth="1" />
        <ellipse cx="100" cy="100" rx="90" ry="34" stroke="#17b891" strokeWidth="1" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="90" ry="34" stroke="#5865ff" strokeWidth="1" transform="rotate(120 100 100)" />
        <circle cx="100" cy="100" r="6" fill="#6fe0f5" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div>
          <Reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-light">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-light" />
            Desenvolvimento &amp; Qualidade
          </Reveal>

          <Reveal as="h1" delay={80} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Onde a <span className="text-gradient">Tecnologia</span> encontra a{' '}
            <span className="text-gradient">Ciência</span>
          </Reveal>

          <Reveal delay={160} className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            A Quim Tech une desenvolvimento de software de alta performance e consultoria química
            industrial em um único parceiro técnico — rigor de engenharia aplicado a cada linha de
            código e a cada laudo.
          </Reveal>

          <Reveal delay={260} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#tech"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-royal px-7 py-4 text-sm font-bold text-void shadow-xl shadow-cyan/25 transition-all hover:shadow-cyan/40 hover:brightness-110"
            >
              Explorar Soluções Tech
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#quimica"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-teal-light/40 bg-teal-light/5 px-7 py-4 text-sm font-bold text-teal-light transition-all hover:bg-teal-light/15"
            >
              Explorar Soluções em Química
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>

          <Reveal delay={340} className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            {[
              ['2', 'setores de atuação integrados'],
              ['100%', 'rigor técnico documentado'],
              ['1', 'ponto de contato para tudo'],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="text-2xl font-extrabold text-ink">{n}</div>
                <div className="text-xs text-muted">{label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="relative hidden justify-self-center lg:flex">
          <div className="absolute inset-0 animate-float rounded-[2rem] bg-cyan/10 blur-2xl" />
          <img
            src={logo}
            alt="Símbolo Quim Tech: laptop e órbita atômica"
            className="relative w-full max-w-md animate-float rounded-[2rem] object-contain drop-shadow-[0_0_60px_rgba(34,184,224,0.35)]"
          />
        </Reveal>
      </div>
    </section>
  )
}
