import Reveal from './Reveal'

const CASES = [
  {
    tag: 'Tech',
    tone: 'cyan',
    title: 'Sistema de Gestão de Dados Industriais',
    desc: 'Plataforma para centralizar indicadores de produção e substituir planilhas manuais.',
  },
  {
    tag: 'Química',
    tone: 'teal',
    title: 'Adequação a Normas Regulatórias',
    desc: 'Auditoria e plano de ação para conformidade de uma planta industrial de médio porte.',
  },
  {
    tag: 'Tech',
    tone: 'cyan',
    title: 'Landing Page de Alta Conversão',
    desc: 'Página institucional com foco em performance, SEO e captação de leads qualificados.',
  },
  {
    tag: 'Química',
    tone: 'teal',
    title: 'Rastreabilidade de Processos Químicos',
    desc: 'Mentoria técnica para implantação de controle de lote e rastreabilidade de insumos.',
  },
  {
    tag: 'Tech',
    tone: 'cyan',
    title: 'Integração entre Sistemas Legados',
    desc: 'API de integração eliminando retrabalho manual entre ERP e sistema de estoque.',
  },
  {
    tag: 'Química',
    tone: 'teal',
    title: 'Diagnóstico de Segurança de Processo',
    desc: 'Levantamento de riscos operacionais com plano de mitigação priorizado.',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-abyss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Portfólio</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Casos de sucesso em <span className="text-gradient">gestão de dados</span> e adequações
            industriais
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal
              as="div"
              delay={(i % 3) * 100}
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy/40 p-6 transition-all hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 ${
                  c.tone === 'cyan' ? 'bg-gradient-to-r from-cyan to-royal' : 'bg-gradient-to-r from-teal to-teal-light'
                }`}
              />
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  c.tone === 'cyan' ? 'bg-cyan/15 text-cyan-light' : 'bg-teal-light/15 text-teal-light'
                }`}
              >
                {c.tag}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
