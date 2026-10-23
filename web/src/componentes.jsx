import { useEffect, useState } from 'react'

/** Polaroid con pie escrito a mano. `revelar` anima el revelado de la imagen. */
export function Polaroid({ children, pie, ancho = 220, giro = -2, revelar = false, className = '' }) {
  return (
    <figure
      className={`polaroid ${revelar ? 'revelar' : ''} ${className}`}
      style={{ '--ancho': typeof ancho === 'number' ? `${ancho}px` : ancho, '--giro': `${giro}deg` }}
    >
      <div className="imagen">{children}</div>
      {pie && <figcaption className="pie-foto">{pie}</figcaption>}
    </figure>
  )
}

/** Texto escrito en espejo, como los tatuajes de Leonard. Se da la vuelta tras `retraso` ms o al pasar el ratón. */
export function Espejo({ children, retraso = null, className = '' }) {
  const [leido, setLeido] = useState(false)
  useEffect(() => {
    if (retraso == null) return
    const t = setTimeout(() => setLeido(true), retraso)
    return () => clearTimeout(t)
  }, [retraso])
  return (
    <span
      className={`espejo ${leido ? 'leido' : ''} ${className}`}
      onMouseEnter={() => retraso == null && setLeido(true)}
      onMouseLeave={() => retraso == null && setLeido(false)}
    >
      {children}
    </span>
  )
}

/** Escena dibujada para el interior de las polaroids (sin imágenes de la película). */
export function Escena({ tipo }) {
  const comunes = { width: '100%', height: '100%', viewBox: '0 0 100 92', preserveAspectRatio: 'xMidYMid slice' }
  if (tipo === 'motel')
    return (
      <svg {...comunes} aria-hidden="true">
        <rect width="100" height="92" fill="#1b2633" />
        <rect x="14" y="40" width="72" height="40" fill="#2d3a49" />
        <rect x="20" y="50" width="12" height="16" fill="#f0a43a" opacity=".85" />
        <rect x="44" y="50" width="12" height="16" fill="#3b4b5d" />
        <rect x="68" y="50" width="12" height="16" fill="#f0a43a" opacity=".5" />
        <rect x="30" y="18" width="40" height="12" rx="2" fill="none" stroke="#b9507f" strokeWidth="1.6" />
        <text x="50" y="27" textAnchor="middle" fontSize="7" fill="#b9507f" fontFamily="Big Shoulders Display" fontWeight="800">MOTEL</text>
        <text x="62" y="62" fontSize="6" fill="#f6f4ee" fontFamily="Big Shoulders Display">21</text>
      </svg>
    )
  if (tipo === 'coche')
    return (
      <svg {...comunes} aria-hidden="true">
        <rect width="100" height="92" fill="#22303d" />
        <rect y="66" width="100" height="26" fill="#3a4a5a" />
        <path d="M14 66 L22 50 L68 50 L80 60 L88 62 L88 70 L14 70 Z" fill="#8f9aa5" />
        <circle cx="30" cy="70" r="6" fill="#151b22" /><circle cx="74" cy="70" r="6" fill="#151b22" />
        <path d="M0 40 Q25 34 50 40 T100 38" stroke="#4d6378" strokeWidth="2" fill="none" />
      </svg>
    )
  if (tipo === 'taller')
    return (
      <svg {...comunes} aria-hidden="true">
        <rect width="100" height="92" fill="#202b36" />
        <rect x="16" y="30" width="68" height="52" fill="#3b4a59" />
        <g stroke="#2a3542" strokeWidth="2">{[38, 46, 54, 62, 70, 78].map((y) => <line key={y} x1="20" x2="80" y1={y} y2={y} />)}</g>
        <rect x="24" y="16" width="52" height="10" fill="#f6f4ee" />
        <text x="50" y="23.5" textAnchor="middle" fontSize="6" fill="#1e2a36" fontFamily="Big Shoulders Display" fontWeight="800">PUERTO NORTE</text>
        <text x="50" y="58" textAnchor="middle" fontSize="9" fill="#b9507f" fontFamily="Permanent Marker" transform="rotate(-8 50 58)">CERRADO</text>
      </svg>
    )
  if (tipo === 'informe')
    return (
      <svg {...comunes} aria-hidden="true">
        <rect width="100" height="92" fill="#27333f" />
        <rect x="22" y="12" width="56" height="70" fill="#e9e5d8" />
        <g stroke="#9aa3ad" strokeWidth="1.4">{[26, 32, 38, 44, 50, 56].map((y) => <line key={y} x1="28" x2="72" y1={y} y2={y} />)}</g>
        <text x="50" y="72" textAnchor="middle" fontSize="11" fill="#2b47c9" fontFamily="Permanent Marker">J.G.</text>
      </svg>
    )
  if (tipo === 'faro')
    return (
      <svg {...comunes} aria-hidden="true">
        <rect width="100" height="92" fill="#18222c" />
        <polygon points="58,30 100,10 100,48" fill="#f0a43a" opacity=".25" />
        <polygon points="44,82 48,30 56,30 60,82" fill="#e9e5d8" />
        <rect x="46" y="24" width="12" height="8" fill="#f0a43a" />
        <rect y="78" width="100" height="14" fill="#2b47c9" opacity=".5" />
      </svg>
    )
  // pregunta (portada)
  return (
    <svg {...comunes} aria-hidden="true">
      <rect width="100" height="92" fill="#1f2b37" />
      <circle cx="50" cy="40" r="20" fill="#2c3b4b" />
      <rect x="26" y="58" width="48" height="34" rx="16" fill="#2c3b4b" />
      <text x="50" y="49" textAnchor="middle" fontSize="26" fill="#f0a43a" fontFamily="Permanent Marker">?</text>
    </svg>
  )
}
export const REPO = 'https://github.com/HelenDiMo/pildora-bootcamp-memento-agentes'
