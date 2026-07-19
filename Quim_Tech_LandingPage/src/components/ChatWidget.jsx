import { useState } from 'react'
import logo from '../assets/logo.png'
import { buildWhatsAppLink } from '../config'

const AREAS = {
  tech: {
    label: 'Soluções em Software / TI',
    tone: 'cyan',
    message: 'Olá, gostaria de falar com um especialista em Soluções de Software / TI.',
  },
  quimica: {
    label: 'Consultoria Química',
    tone: 'teal',
    message: 'Olá, gostaria de falar com um especialista em Consultoria Química.',
  },
}

function BotBubble({ children }) {
  return (
    <div className="flex items-start gap-2.5">
      <img src={logo} alt="" className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-contain" />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3 text-sm leading-relaxed text-ink">
        {children}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [area, setArea] = useState(null)

  const reset = () => setArea(null)

  return (
    <>
      {/* Panel */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-2.5rem))] origin-bottom-right rounded-3xl border border-white/10 bg-navy/95 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-300 sm:right-6 ${
          open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
        role="dialog"
        aria-label="Chat de triagem Quim Tech"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between gap-3 rounded-t-3xl bg-gradient-to-r from-cyan/15 to-royal/15 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Quim Tech" className="h-8 w-8 rounded-full object-contain" />
            <div>
              <p className="text-sm font-bold text-ink">Quim Tech</p>
              <p className="flex items-center gap-1.5 text-[11px] text-teal-light">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-light" /> online agora
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/10 hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="scrollbar-none max-h-[60vh] space-y-4 overflow-y-auto px-5 py-5">
          <BotBubble>
            Olá! Bem-vindo à <strong>Quim Tech</strong>. Como podemos acelerar o seu negócio hoje?
          </BotBubble>

          {!area && (
            <div className="flex flex-col gap-2 pl-9">
              {Object.entries(AREAS).map(([key, a]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setArea(key)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all hover:scale-[1.02] ${
                    a.tone === 'cyan'
                      ? 'border-cyan/30 bg-cyan/10 text-cyan-light hover:bg-cyan/20'
                      : 'border-teal-light/30 bg-teal-light/10 text-teal-light hover:bg-teal-light/20'
                  }`}
                >
                  {key === 'tech' ? '[1] ' : '[2] '}
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {area && (
            <>
              <div className="flex justify-end pl-9">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan/20 px-4 py-3 text-sm text-ink">
                  {AREAS[area].label}
                </div>
              </div>

              <BotBubble>
                Excelente! Vou te transferir agora mesmo para o nosso especialista nessa área. Clique
                abaixo para iniciar o atendimento seguro no WhatsApp.
              </BotBubble>

              <div className="flex flex-col gap-2 pl-9">
                <a
                  href={buildWhatsAppLink(AREAS[area].message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-void transition-transform hover:scale-[1.02]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.55a9.9 9.9 0 0 0 4.9 1.3h.01c5.46 0 9.9-4.44 9.9-9.9C21.94 6.44 17.5 2 12.04 2Zm0 18.02c-1.55 0-3.05-.42-4.36-1.2l-.31-.18-3.05.92.92-2.98-.2-.31a8.06 8.06 0 0 1-1.24-4.36c0-4.46 3.63-8.09 8.24-8.09 2.2 0 4.27.86 5.82 2.4a8.02 8.02 0 0 1 2.4 5.7c0 4.46-3.63 8.1-8.22 8.1Zm4.49-6.08c-.24-.12-1.44-.71-1.67-.8-.22-.08-.38-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
                  </svg>
                  Iniciar no WhatsApp
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-medium text-muted transition-colors hover:text-mist"
                >
                  ← Voltar às opções
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar chat' : 'Abrir chat de triagem'}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-royal text-void shadow-2xl shadow-cyan/30 transition-transform hover:scale-105 sm:right-6"
      >
        <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-cyan/40 blur-xl" />
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8c-1.1 0-2.15-.22-3.1-.63L4 20l1.05-4.2A7.94 7.94 0 0 1 4 12Z"
              fill="currentColor"
              fillOpacity="0.9"
            />
          </svg>
        )}
        <img
          src={logo}
          alt=""
          className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-void object-contain transition-opacity ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </button>
    </>
  )
}
