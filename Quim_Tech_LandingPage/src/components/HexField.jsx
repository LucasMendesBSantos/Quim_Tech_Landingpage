/** Decorative hexagon-circuit pattern, echoing the logo's molecular/network motif. */
export default function HexField({ className = '', tone = 'cyan' }) {
  const stroke = tone === 'teal' ? '#17b891' : '#22b8e0'
  const dot = tone === 'teal' ? '#5fe3c4' : '#6fe0f5'
  const uid = tone === 'teal' ? 'hex-teal' : 'hex-cyan'

  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={uid} width="100" height="86.6" patternUnits="userSpaceOnUse">
          <path
            d="M25 0 L75 0 L100 43.3 L75 86.6 L25 86.6 L0 43.3 Z"
            stroke={stroke}
            strokeOpacity="0.22"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="25" cy="0" r="2" fill={dot} fillOpacity="0.5" />
          <circle cx="75" cy="0" r="2" fill={dot} fillOpacity="0.5" />
          <circle cx="100" cy="43.3" r="2" fill={dot} fillOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill={`url(#${uid})`} />
    </svg>
  )
}
