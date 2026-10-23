import { useState } from 'react'

const ETAPAS = [
  { quien: 'Agente', clase: 'borrador', texto: 'J.G. está en la habitación 21 del motel.' },
  { quien: 'Revisor', clase: 'critica', texto: 'El registro del motel dice que se fue hace 5 días. La respuesta usa un dato antiguo.' },
  { quien: 'Agente', clase: 'final', texto: 'J.G. (Jonás Gamell) dejó el motel. Su última dirección es calle del Faro, 7, según el archivo del taller.' },
]

export default function Reflexion() {
  const [n, setN] = useState(1)
  return (
    <section className="dos-col">
      <div>
        <h2 className="titulo">Reflexión: revisar antes de entregar</h2>
        <p className="subtitulo">
          Un segundo paso del LLM (o un segundo LLM) critica la respuesta. Si no aprueba, el agente lo intenta otra vez.
        </p>
        <ul className="lista">
          <li>Detecta datos inventados o que contradicen las pistas.</li>
          <li>Cuesta más llamadas al LLM: hay que poner un <strong>máximo de intentos</strong>.</li>
          <li>Merece la pena cuando un error sale caro.</li>
        </ul>
      </div>
      <div>
        <div className="reflexion" aria-live="polite">
          {ETAPAS.slice(0, n).map((e) => (
            <div key={e.clase} className={`nota-reflexion ${e.clase}`}>
              <span className="quien">{e.quien}</span>
              <p>{e.texto}</p>
            </div>
          ))}
        </div>
        <div className="botones">
          <button className="boton" onClick={() => setN(n + 1)} disabled={n >= ETAPAS.length}>
            {n === 1 ? 'Pasar al revisor' : 'Corregir'}
          </button>
          <button className="boton fantasma" onClick={() => setN(1)}>Reiniciar</button>
        </div>
      </div>
    </section>
  )
}
