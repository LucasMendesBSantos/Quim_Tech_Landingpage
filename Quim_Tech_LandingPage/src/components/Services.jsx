import { useEffect, useState } from 'react'
import HexField from './HexField'
import Reveal from './Reveal'

const ICONS = {
  code: (
    <path d="M8 6L3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16" strokeLinecap="round" strokeLinejoin="round" />
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 9v11" strokeLinecap="round" />
    </>
  ),
  link: (
    <path
      d="M9 12a4 4 0 0 0 5.66 0l2.34-2.34a4 4 0 1 0-5.66-5.66L10 5.34M15 12a4 4 0 0 0-5.66 0l-2.34 2.34a4 4 0 1 0 5.66 5.66L14 18.66"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  shield: (
    <path
      d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  flask: (
    <path
      d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3.02L14 9V3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  mentor: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.9 3.13-7 7-7s7 3.1 7 7" strokeLinecap="round" />
    </>
  ),
  audit: (
    <>
      <path d="M6 3h9l3 3v15H6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cert: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M9 13.5L7.5 21l4.5-2.4 4.5 2.4-1.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

function Icon({ name, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      {ICONS[name]}
    </svg>
  )
}

const TABS = [
  {
    id: 'tech',
    tone: 'cyan',
    label: 'Tech',
    eyebrow: 'Software & TI',
    title: 'Soluções Tech',
    desc: 'Engenharia de software para negócios que não podem parar.',
    segment:
      'Segmento: startups, e-commerces e empresas de médio a grande porte que precisam digitalizar processos, lançar produtos digitais ou proteger seus sistemas contra riscos de segurança.',
    ctaLabel: 'Falar sobre um projeto de software',
    items: [
      { icon: 'layout', title: 'Sistemas Internos', desc: 'Plataformas sob medida para gestão, dados e processos operacionais.' },
      { icon: 'code', title: 'Landing Pages & Sites', desc: 'Presença digital rápida, responsiva e orientada a conversão.' },
      { icon: 'link', title: 'Integrações & Automações', desc: 'APIs e fluxos que conectam seus sistemas e eliminam trabalho manual.' },
      { icon: 'shield', title: 'Cibersegurança', desc: 'Hardening, boas práticas e auditoria de segurança de aplicações.' },
    ],
  },
  {
    id: 'quimica',
    tone: 'teal',
    label: 'Química',
    eyebrow: 'Química Industrial',
    title: 'Soluções em Química',
    desc: 'Consultoria técnica para processos seguros, eficientes e em conformidade.',
    segment:
      'Segmento: indústrias químicas, laboratórios e plantas fabris que precisam de consultoria técnica, adequação regulatória e gestão de riscos de processo.',
    ctaLabel: 'Falar sobre consultoria química',
    items: [
      { icon: 'flask', title: 'Consultoria Industrial', desc: 'Suporte técnico especializado para processos químicos industriais.' },
      { icon: 'mentor', title: 'Mentoria Técnica', desc: 'Capacitação de equipes e times técnicos em química aplicada.' },
      { icon: 'audit', title: 'Auditoria Química', desc: 'Diagnóstico completo de processos, riscos e não conformidades.' },
      { icon: 'cert', title: 'Adequação Normativa', desc: 'Conformidade com normas regulatórias e certificações do setor.' },
    ],
  },
]

function ServicePanel({ tone, eyebrow, title, desc, segment, items, ctaLabel }) {
  const isTech = tone === 'cyan'
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 ${
        isTech ? 'border-cyan/25 bg-gradient-to-b from-cyan/[0.07] to-transparent' : 'border-teal-light/25 bg-gradient-to-b from-teal/[0.08] to-transparent'
      }`}
    >
      <HexField tone={isTech ? 'cyan' : 'teal'} className="absolute inset-0 h-full w-full opacity-25" />
      <div className="relative">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${
            isTech ? 'border-cyan/30 bg-cyan/10 text-cyan-light' : 'border-teal-light/30 bg-teal-light/10 text-teal-light'
          }`}
        >
          {eyebrow}
        </span>

        <h3 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-lg text-mist">{desc}</p>
        <p className={`mt-3 max-w-lg text-sm font-medium ${isTech ? 'text-cyan-light' : 'text-teal-light'}`}>{segment}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className={`group rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/15 hover:bg-white/[0.05]`}
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                  isTech ? 'bg-cyan/15 text-cyan-light' : 'bg-teal-light/15 text-teal-light'
                }`}
              >
                <Icon name={item.icon} className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-ink">{item.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <a
          href="#contato"
          className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
            isTech ? 'text-cyan-light hover:text-cyan' : 'text-teal-light hover:text-teal'
          }`}
        >
          {ctaLabel}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const [active, setActive] = useState('tech')

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'tech' || hash === 'quimica') setActive(hash)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0]

  return (
    <section id="solucoes" className="relative scroll-mt-28 bg-abyss py-24 sm:py-32">
      <span id="tech" className="absolute -top-24" aria-hidden="true" />
      <span id="quimica" className="absolute -top-24" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Nossas Soluções</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Duas áreas. <span className="text-gradient">Um único padrão de excelência.</span>
          </h2>
          <p className="mt-4 text-mist">
            Software e química industrial, tratados com o mesmo rigor técnico — escolha por onde começar.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 flex w-full max-w-md items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
          {TABS.map((tab) => {
            const isActiveTab = active === tab.id
            const isTech = tab.tone === 'cyan'
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={isActiveTab}
                className={`flex-1 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  isActiveTab
                    ? isTech
                      ? 'bg-gradient-to-r from-cyan to-royal text-void shadow-lg shadow-cyan/20'
                      : 'bg-gradient-to-r from-teal to-teal-light text-void shadow-lg shadow-teal/20'
                    : 'text-mist hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </Reveal>

        <Reveal key={activeTab.id} className="mt-8">
          <ServicePanel
            tone={activeTab.tone}
            eyebrow={activeTab.eyebrow}
            title={activeTab.title}
            desc={activeTab.desc}
            segment={activeTab.segment}
            items={activeTab.items}
            ctaLabel={activeTab.ctaLabel}
          />
        </Reveal>
      </div>
    </section>
  )
}
