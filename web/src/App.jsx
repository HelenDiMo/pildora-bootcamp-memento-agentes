import { useCallback, useEffect, useState } from 'react'
import Portada from './slides/1-Portada.jsx'
import Leonard from './slides/2-Leonard.jsx'
import Agente from './slides/3-Agente.jsx'
import ReAct from './slides/4-ReAct.jsx'
import PlanEjecuta from './slides/5-PlanEjecuta.jsx'
import Reflexion from './slides/6-Reflexion.jsx'
import Memoria from './slides/7-Memoria.jsx'
import LangGraph from './slides/8-LangGraph.jsx'
import Envenenada from './slides/9-Envenenada.jsx'
import Reto from './slides/10-Reto.jsx'
import Cierre from './slides/11-Cierre.jsx'

const SLIDES = [
  { titulo: 'Portada', C: Portada },
  { titulo: 'Leonard', C: Leonard },
  { titulo: 'Qué es un agente', C: Agente },
  { titulo: 'ReAct', C: ReAct },
  { titulo: 'Plan-and-Execute', C: PlanEjecuta },
  { titulo: 'Reflexión', C: Reflexion },
  { titulo: 'Tipos de memoria', C: Memoria },
  { titulo: 'Memoria en LangGraph', C: LangGraph },
  { titulo: 'Memoria envenenada', C: Envenenada },
  { titulo: 'Reto', C: Reto },
  { titulo: 'Cierre', C: Cierre },
]

import { REPO } from './componentes.jsx'
import './slides.css'

function leerHash() {
  const n = parseInt(window.location.hash.replace('#', ''), 10)
  return Number.isFinite(n) && n >= 1 && n <= SLIDES.length ? n - 1 : 0
}

export default function App() {
  const [i, setI] = useState(leerHash)

  const ir = useCallback((n) => {
    const destino = Math.max(0, Math.min(SLIDES.length - 1, n))
    setI(destino)
    window.history.replaceState(null, '', `#${destino + 1}`)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea, button')) {
        if (!['ArrowRight', 'ArrowLeft'].includes(e.key) || e.target.tagName !== 'BUTTON') return
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') ir(i + 1)
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') ir(i - 1)
      if (e.key === 'Home') ir(0)
      if (e.key === 'End') ir(SLIDES.length - 1)
    }
    const onHash = () => setI(leerHash())
    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('hashchange', onHash)
    }
  }, [i, ir])

  const { C } = SLIDES[i]

  return (
    <div className="escenario">
      <main className="diapositiva" key={i}>
        <C />
      </main>

      <footer className="pie">
        <span>
          Autora: Elena Díaz,{' '}
          <a href={REPO} target="_blank" rel="noreferrer">@HelenDiMo</a>
        </span>
        <nav className="tira" aria-label="Diapositivas">
          {SLIDES.map((s, n) => (
            <button
              key={s.titulo}
              className={`foto ${n === i ? 'activa' : ''} ${n < i ? 'vista' : ''}`}
              onClick={() => ir(n)}
              aria-label={`${n + 1}. ${s.titulo}`}
              aria-current={n === i ? 'step' : undefined}
              title={`${n + 1}. ${s.titulo}`}
            />
          ))}
        </nav>
        <span className="flechas">
          <button onClick={() => ir(i - 1)} disabled={i === 0} aria-label="Anterior">‹</button>
          <span>{i + 1} / {SLIDES.length}</span>
          <button onClick={() => ir(i + 1)} disabled={i === SLIDES.length - 1} aria-label="Siguiente">›</button>
        </span>
      </footer>
    </div>
  )
}
