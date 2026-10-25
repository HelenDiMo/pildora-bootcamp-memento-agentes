import { useEffect, useState } from 'react'
import { REPO } from '../componentes.jsx'

const MINUTOS = 22
const MISIONES = [
  { nombre: 'Tatuar', mision: 'Completa 2 líneas para guardar y leer tatuajes en el Store.', concepto: 'Memoria a largo plazo', tiempo: '~8 min' },
  { nombre: 'El tatuaje falso', mision: 'Mira cómo Leonard se cree un tatuaje falso y escribe, en español, la regla que lo defiende.', concepto: 'Memoria envenenada', tiempo: '~8 min' },
  { nombre: 'Extra: el revisor', mision: 'Si te sobra tiempo: haz que otro paso del LLM revise la respuesta.', concepto: 'Reflexión', tiempo: 'el resto' },
]

export default function Reto() {
  const [quedan, setQuedan] = useState(MINUTOS * 60)
  const [corre, setCorre] = useState(false)

  useEffect(() => {
    if (!corre || quedan <= 0) return
    const t = setTimeout(() => setQuedan((q) => q - 1), 1000)
    return () => clearTimeout(t)
  }, [corre, quedan])

  const mm = String(Math.floor(quedan / 60)).padStart(2, '0')
  const ss = String(quedan % 60).padStart(2, '0')

  return (
    <section>
      <div className="reto-cabecera">
        <div>
          <h2 className="titulo">Tu reto: tres misiones</h2>
          <p className="subtitulo">
            Para hacer en clase o en casa. Abre <code>notebooks/02_reto_individual_TODO.ipynb</code> y hazlas en orden.
            Busca los <code>TODO</code>: todo lo demás ya funciona.
          </p>
        </div>
        <div className={`cronometro ${quedan === 0 ? 'fin' : ''}`}>
          <span className="tiempo" aria-live="off">{mm}:{ss}</span>
          <div className="botones">
            <button className="boton" onClick={() => setCorre(!corre)} disabled={quedan === 0}>{corre ? 'Pausar' : 'Empezar'}</button>
            <button className="boton fantasma" onClick={() => { setCorre(false); setQuedan(MINUTOS * 60) }}>Reiniciar</button>
          </div>
        </div>
      </div>

      <ol className="roles">
        {MISIONES.map((m, k) => (
          <li key={m.nombre} className={`rol ${k === 2 ? 'extra' : ''}`} style={{ '--giro': `${[-1.5, 1, -0.5][k]}deg` }}>
            <p className="mano rol-nombre">{k + 1}. {m.nombre}</p>
            <p>{m.mision}</p>
            <p className="suave">{m.concepto} · {m.tiempo}</p>
          </li>
        ))}
      </ol>

      <div className="dos-col preparar">
        <div className="panel">
          <h3>¿Con qué LLM?</h3>
          <p><strong>Ollama:</strong> con el modelo ya descargado (<code>ollama pull llama3.1:8b</code>).</p>
          <p><strong>Groq:</strong> clave gratuita en console.groq.com, pegada en tu archivo <code>.env</code>.</p>
          <p className="suave">¿Sin ninguno? Abre la solución (<code>03_reto_individual_solucion.ipynb</code>) y sigue la traza: también vale.</p>
        </div>
        <div className="panel">
          <h3>El repositorio</h3>
          <p><a href={REPO} target="_blank" rel="noreferrer">github.com/HelenDiMo/pildora-bootcamp-memento-agentes</a></p>
          <p className="suave">Instrucciones de instalación en el README.</p>
        </div>
      </div>
    </section>
  )
}
