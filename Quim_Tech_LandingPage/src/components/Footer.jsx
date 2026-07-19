import logo from '../assets/logo.png'
import { buildWhatsAppLink } from '../config'

const COLUMNS = [
  {
    title: 'Navegação',
    links: [
      { label: 'Início', href: '#top' },
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'Portfólio', href: '#portfolio' },
      { label: 'Avaliações', href: '#avaliacoes' },
    ],
  },
  {
    title: 'Software & TI',
    links: [
      { label: 'Sistemas Internos', href: '#tech' },
      { label: 'Landing Pages', href: '#tech' },
      { label: 'Cibersegurança', href: '#tech' },
    ],
  },
  {
    title: 'Química Industrial',
    links: [
      { label: 'Consultoria', href: '#quimica' },
      { label: 'Mentoria Técnica', href: '#quimica' },
      { label: 'Auditoria', href: '#quimica' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden border-t border-white/10 bg-void pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <img src={logo} alt="Quim Tech" className="h-10 w-10 rounded-xl object-contain" />
              <span className="text-lg font-extrabold text-ink">
                <span className="text-cyan-light">Quim</span>Tech
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Desenvolvimento &amp; Qualidade — tecnologia e ciência química a serviço do seu negócio.
            </p>
            <a
              href={buildWhatsAppLink('Olá, gostaria de falar com a Quim Tech.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-royal px-5 py-2.5 text-sm font-semibold text-void transition-transform hover:scale-105"
            >
              Falar no WhatsApp
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted transition-colors hover:text-cyan-light">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Quim Tech. Todos os direitos reservados.</p>
          <p className="text-xs text-muted">Desenvolvimento &amp; Qualidade</p>
        </div>
      </div>
    </footer>
  )
}
