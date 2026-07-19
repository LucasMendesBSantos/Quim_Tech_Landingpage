export const WHATSAPP_NUMBER = '5585987788112'

export const SITE = {
  name: 'Quim Tech',
  tagline: 'Desenvolvimento & Qualidade',
}

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
