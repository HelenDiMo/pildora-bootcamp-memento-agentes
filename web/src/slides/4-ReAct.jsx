import { useEffect, useState } from 'react'
import { Polaroid, Escena } from '../componentes.jsx'

// Traza simulada (no llama a ningún LLM): la misma historia que el notebook
const PASOS = [
  { tipo: 'pensar', texto: 'Busco a J.G. Empiezo por el informe del incidente.' },
  { tipo: 'actuar', texto: 'buscar_archivo("informe")' },
  { tipo: 'observar', texto: 'Un testigo vio las iniciales J.G. en la chaqueta del segundo intruso.', foto: 'informe', pie: 'J.G. = el 2º intruso' },
  { tipo: 'pensar', texto: 'Necesito un nombre completo. ¿Dejó algo atrás?' },
  { tipo: 'actuar', texto: 'buscar_archivo("coche")' },
  { tipo: 'observar', texto: 'Coche abandonado a nombre de Jonás Gamell, mecánico del taller Puerto Norte.', foto: 'coche', pie: 'Jonás Gamell. Mecánico.' },
  { tipo: 'pensar', texto: 'Voy a por el taller.' },
  { tipo: 'actuar', texto: 'buscar_archivo("taller")' },
  { tipo: 'observar', texto: 'El taller cerró hace 3 días. Dirección de contacto: calle del Faro, 7.', foto: 'taller', pie: 'Calle del Faro, 7' },
  { tipo: 'responder', texto: 'J.G. es Jonás Gamell. Su última dirección conocida es calle del Faro, 7.' },
]

const ETIQUETA = { pensar: 'Pensamiento', actuar: 'Acción', observar: 'Observación', responder: 'Respuesta' }

export default function ReAct() {
  const [n, setN] = useState(0) // pasos visibles
  const [auto, setAuto] = useState(false)
  const [flash, setFlash] = useState(0)

  const avanzar = () => {
    if (n >= PASOS.length) return
    if (PASOS[n].tipo === 'observar') setFlash((f) => f + 1)
    setN(n + 1)
  }

  useEffect(() => {
    if (!auto) return
    if (n >= PASOS.length) { setAuto(false); return }
    const t = setTimeout(avanzar, 1300)
    return () => clearTimeout(t)
  }, [auto, n])

  const actual = PASOS[n - 1]
  const nodo = !actual ? null : actual.tipo === 'observar' ? 'herramientas' : actual.tipo === 'responder' ? 'fin' : 'agente'
  const fotos = PASOS.slice(0, n).filter((p) => p.foto)

  return (
    <section className="react">
      <div className="react-cabecera">
        <div>
          <h2 className="titulo">ReAct: piensa, actúa, observa</h2>
          <p className="subtitulo">
            El agente no tiene un plan escrito. En cada vuelta decide <strong>solo el siguiente paso</strong>,
            a partir de lo último que ha visto.
          </p>
        </div>
        <svg className="bucle" viewBox="0 0 300 120" role="img" aria-label="Bucle: el agente llama a herramientas y vuelve, hasta responder">
          <defs><marker id="pta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="currentColor" /></marker></defs>
          <g className={`n ${nodo === 'agente' ? 'on' : ''}`}><rect x="10" y="35" width="100" height="44" rx="4" /><text x="60" y="62">agente</text></g>
          <g className={`n ${nodo === 'herramientas' ? 'on' : ''}`}><rect x="175" y="35" width="115" height="44" rx="4" /><text x="232" y="62">herramientas</text></g>
          <path d="M110 46 C140 20 150 20 175 46" className="flecha" markerEnd="url(#pta)" />
          <path d="M175 70 C150 96 140 96 110 70" className="flecha" markerEnd="url(#pta)" />
          <text x="142" y="16" className="mini">acción</text>
          <text x="142" y="114" className="mini">observación</text>
        </svg>
      </div>

      <div className="react-cuerpo">
        <ol className="traza" aria-live="polite">
          {PASOS.slice(0, n).map((p, k) => (
            <li key={k} className={`paso ${p.tipo}`}>
              <span className="etq">{ETIQUETA[p.tipo]}</span>
              <span className={p.tipo === 'actuar' ? 'cod' : ''}>{p.texto}</span>
            </li>
          ))}
          {n === 0 && <li className="paso vacio suave">Pregunta: «¿Quién es J.G. y dónde lo encuentro?» Pulsa «Siguiente paso».</li>}
        </ol>

        <div className="pared">
          {fotos.map((p, k) => (
            <Polaroid key={p.foto} pie={p.pie} ancho={150} giro={[-4, 3, -1][k]} revelar>
              <Escena tipo={p.foto} />
            </Polaroid>
          ))}
        </div>
      </div>

      <div className="botones">
        <button className="boton" onClick={avanzar} disabled={n >= PASOS.length}>Siguiente paso</button>
        <button className="boton fantasma" onClick={() => { if (n >= PASOS.length) setN(0); setAuto(true) }} disabled={auto}>Reproducir</button>
        <button className="boton fantasma" onClick={() => { setAuto(false); setN(0) }}>Reiniciar</button>
      </div>
      {flash > 0 && <div key={flash} className="flash" aria-hidden="true" />}
    </section>
  )
}
