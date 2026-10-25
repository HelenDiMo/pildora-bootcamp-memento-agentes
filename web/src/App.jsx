import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Portada from './slides/1-Portada.jsx'
import Leonard from './slides/2-Leonard.jsx'
import Agente from './slides/3-Agente.jsx'
import Herramientas from './slides/4-Herramientas.jsx'
import ReAct from './slides/5-ReAct.jsx'
import PlanEjecuta from './slides/6-PlanEjecuta.jsx'
import Reflexion from './slides/7-Reflexion.jsx'
import Memoria from './slides/8-Memoria.jsx'
import HilosAlmacen from './slides/9-HilosAlmacen.jsx'
import Envenenada from './slides/10-Envenenada.jsx'
import Cierre from './slides/11-Cierre.jsx'
import Reto from './slides/12-Reto.jsx'

const SLIDES = [
  { titulo: 'Portada', C: Portada },
  { titulo: 'Leonard', C: Leonard },
  { titulo: 'Qué es un agente', C: Agente },
  { titulo: 'Herramientas', C: Herramientas },
  { titulo: 'ReAct', C: ReAct },
  { titulo: 'Plan-and-Execute', C: PlanEjecuta },
  { titulo: 'Reflexión', C: Reflexion },
  { titulo: 'Tipos de memoria', C: Memoria },
  { titulo: 'Hilos y almacén', C: HilosAlmacen },
  { titulo: 'Memoria envenenada', C: Envenenada },
  { titulo: 'Resumen y fuentes', C: Cierre },
  { titulo: 'Reto', C: Reto },
]

import { REPO } from './componentes.jsx'
import './slides.css'

// Encoge la diapositiva lo justo para que quepa en pantalla: nunca hay scroll
function Encaje({ children }) {
  const marco = useRef(null)
  const contenido = useRef(null)
  const [escala, setEscala] = useState(1)

  useLayoutEffect(() => {
    const medir = () => {
      const m = marco.current
      const c = contenido.current
      if (!m || !c) return
      if (window.innerWidth < 700) { setEscala(1); return }   // móvil: scroll normal, sin encoger
      const estilo = getComputedStyle(m)
      const alto = m.clientHeight - parseFloat(estilo.paddingTop) - parseFloat(estilo.paddingBottom)
      const ancho = m.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight)
      const e = Math.min(1, alto / c.offsetHeight, ancho / c.scrollWidth)
      setEscala(e > 0.98 ? 1 : Math.max(0.5, e))
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(contenido.current)
    ro.observe(marco.current)
    return () => ro.disconnect()
  }, [])

  return (
    <main className="diapositiva" ref={marco}>
      <div className="encaje" ref={contenido} style={escala < 1 ? { transform: `scale(${escala})` } : undefined}>
        {children}
      </div>
    </main>
  )
}

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
      <Encaje key={i}>
        <C />
      </Encaje>

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
