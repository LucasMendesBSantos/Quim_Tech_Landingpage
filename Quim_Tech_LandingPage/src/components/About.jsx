import logo from '../assets/logo.png'
import Reveal from './Reveal'

const PILLARS = [
  {
    title: 'Rigor de Engenharia',
    desc: 'Todo projeto — seja um sistema ou um laudo técnico — segue metodologia, documentação e revisão.',
  },
  {
    title: 'Visão Híbrida',
    desc: 'Entendemos tanto a lógica de um algoritmo quanto a reação de um processo industrial.',
  },
  {
    title: 'Parceria de Longo Prazo',
    desc: 'Acompanhamos a evolução do seu negócio, não apenas a entrega de um projeto pontual.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-void py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan/15 via-transparent to-teal-light/10 blur-2xl" />
          <img
            src={logo}
            alt="Quim Tech"
            className="relative w-full rounded-[2rem] border border-white/10 object-contain shadow-2xl"
          />
        </Reveal>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Sobre Nós</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Tecnologia e ciência, tratadas com o mesmo rigor técnico.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-mist">
            A Quim Tech nasceu da constatação de que desenvolvimento de software e química industrial
            compartilham o mesmo DNA: método, precisão e responsabilidade com o resultado. Reunimos
            essas duas frentes em uma única equipe para que empresas não precisem dividir sua confiança
            entre fornecedores desconexos.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal as="div" delay={i * 100} key={p.title} className="border-l-2 border-cyan/40 pl-4">
                <h3 className="text-sm font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
