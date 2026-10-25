import { useEffect, useState } from 'react'

const CONVERSACION = [
  { quien: 'tú', texto: 'Me llamo Helen y busco a J.G.' },
  { quien: 'llm', texto: 'Encantado, Helen. ¿Qué sabes de J.G.?' },
  { quien: 'tú', texto: 'Que tiene un coche gris.' },
]
const DURACION = 8 // segundos hasta el «borrado»

export default function Leonard() {
  const [vuelta, setVuelta] = useState(0)
  const [quedan, setQuedan] = useState(DURACION)
  const borrado = quedan === 0

  useEffect(() => {
    if (borrado) return
    const t = setTimeout(() => setQuedan((q) => q - 1), 1000)
    return () => clearTimeout(t)
  }, [quedan, borrado])

  const despertar = () => { setVuelta((v) => v + 1); setQuedan(DURACION) }

  return (
    <section className="dos-col izq-ancha">
      <div>
        <h2 className="titulo">Un LLM es Leonard</h2>
        <p className="subtitulo">
          Leonard no puede guardar recuerdos nuevos: cada pocos minutos se despierta sin saber qué estaba haciendo.
          A un LLM le pasa lo mismo cada vez que le escribes.
        </p>
        <ul className="lista">
          <li>Cada mensaje que le mandas, el LLM lo lee <strong>desde cero</strong>.</li>
          <li>Si un chat parece recordar, es porque el programa <strong>le vuelve a enviar toda la conversación</strong> cada vez.</li>
          <li>Y eso tiene un límite: si la conversación es muy larga, lo más antiguo se pierde.</li>
        </ul>
      </div>

      <div className={`chat ${borrado ? 'chat-borrado' : ''}`} aria-live="polite">
        <div className="chat-cabecera">
          <span>Conversación</span>
          <span className={`reloj ${quedan <= 3 ? 'aviso' : ''}`}>
            {borrado ? 'memoria perdida' : `se olvida en ${quedan}s`}
          </span>
        </div>
        {CONVERSACION.map((m, n) => (
          <p key={`${vuelta}-${n}`} className={`burbuja ${m.quien}`} style={{ animationDelay: `${n * 0.5}s` }}>
            {m.texto}
          </p>
        ))}
        {borrado && (
          <p className="burbuja llm despierta">Hola. ¿Quién eres? ¿Qué estábamos haciendo?</p>
        )}
        <button className="boton" onClick={despertar}>{borrado ? 'Volver a empezar' : 'Reiniciar'}</button>
      </div>
    </section>
  )
}
