import Reveal from './Reveal'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const TEAM = [
  {
    name: 'Lucas Mendes',
    role: 'Tech Lead',
    segment: 'Tech',
    tone: 'cyan',
    bio: 'Lidera a frente de engenharia de software da Quim Tech: arquitetura de sistemas, integrações e cibersegurança aplicadas a negócios que não podem parar.',
    resumeUrl: 'https://curriculo-online-tech-quim.vercel.app/',
  },
]

export default function Team() {
  return (
    <section id="equipe" className="relative scroll-mt-28 bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Nosso Time</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Conheça quem está <span className="text-gradient">por trás dos projetos</span>
          </h2>
          <p className="mt-4 text-mist">
            Profissionais especializados em cada disciplina, com trajetória documentada em currículo próprio.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => {
            const isTech = member.tone === 'cyan'
            return (
              <Reveal
                as="div"
                key={member.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy/40 p-6 transition-all hover:-translate-y-1 hover:border-white/20"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${
                    isTech ? 'bg-gradient-to-r from-cyan to-royal' : 'bg-gradient-to-r from-teal to-teal-light'
                  }`}
                />

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold text-void ${
                      isTech ? 'bg-gradient-to-br from-cyan to-royal' : 'bg-gradient-to-br from-teal to-teal-light'
                    }`}
                  >
                    {initials(member.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{member.name}</h3>
                    <p className={`text-sm font-semibold ${isTech ? 'text-cyan-light' : 'text-teal-light'}`}>{member.role}</p>
                  </div>
                </div>

                <span
                  className={`mt-4 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    isTech ? 'bg-cyan/15 text-cyan-light' : 'bg-teal-light/15 text-teal-light'
                  }`}
                >
                  {member.segment}
                </span>

                <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>

                <a
                  href={member.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isTech ? 'text-cyan-light hover:text-cyan' : 'text-teal-light hover:text-teal'
                  }`}
                >
                  Ver currículo completo
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
