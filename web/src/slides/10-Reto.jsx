import { useEffect, useState } from 'react'
import { REPO } from '../componentes.jsx'

const MINUTOS = 22
const ROLES = [
  { nombre: 'Tatuador', mision: 'Implementa tatuar y leer_tatuajes con el Store.', concepto: 'Memoria a largo plazo' },
  { nombre: 'Revisor', mision: 'Crea el nodo que revisa la respuesta antes de entregarla.', concepto: 'Reflexión' },
  { nombre: 'Saboteador', mision: 'Cuela un tatuaje falso y escribe la regla que defiende al agente.', concepto: 'Memoria envenenada' },
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
          <h2 className="titulo">El reto, por equipos</h2>
          <p className="subtitulo">
            Abrid <code>notebooks/02_reto_equipos_TODO.ipynb</code> y repartid estos roles. Buscad los <code>TODO</code>.
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

      <div className="roles">
        {ROLES.map((r, k) => (
          <div key={r.nombre} className="rol" style={{ '--giro': `${[-1.5, 1, -0.5][k]}deg` }}>
            <p className="mano rol-nombre">{r.nombre}</p>
            <p>{r.mision}</p>
            <p className="suave">{r.concepto}</p>
          </div>
        ))}
      </div>

      <div className="dos-col preparar">
        <div className="panel">
          <h3>¿Con qué LLM?</h3>
          <p><strong>Ollama:</strong> con el modelo ya descargado (<code>ollama pull llama3.1:8b</code>).</p>
          <p><strong>Groq:</strong> clave gratuita en console.groq.com, pegada en vuestro archivo <code>.env</code>.</p>
          <p className="suave">Con que una persona del equipo tenga uno funcionando, basta.</p>
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
