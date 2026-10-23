const PIEZAS = [
  { pelicula: 'Leonard', concepto: 'El LLM', idea: 'Razona y decide, pero no recuerda.' },
  { pelicula: 'El archivo policial, su cámara', concepto: 'Herramientas', idea: 'Funciones que el agente puede usar para actuar y obtener datos.' },
  { pelicula: 'Su método para investigar', concepto: 'Planificación', idea: 'Cómo decide el siguiente paso, o el plan entero.' },
  { pelicula: 'Polaroids y tatuajes', concepto: 'Memoria', idea: 'Lo que guarda fuera de su cabeza para no empezar de cero.' },
]

export default function Agente() {
  return (
    <section>
      <h2 className="titulo">Un agente es un LLM en bucle</h2>
      <p className="ecuacion">
        <span>LLM</span><b>+</b><span>herramientas</span><b>+</b><span>un bucle</span><b>=</b><span className="destaca">agente</span>
      </p>
      <p className="subtitulo">
        En cada vuelta del bucle, el agente tiene que responder dos preguntas. Esas dos preguntas son el temario de hoy.
      </p>
      <div className="preguntas">
        <div className="panel">
          <p className="mano pregunta">«¿Qué hago ahora?»</p>
          <p><strong>Planificación:</strong> ReAct, Plan-and-Execute y Reflexión.</p>
        </div>
        <div className="panel">
          <p className="mano pregunta">«¿Qué ha pasado hasta ahora?»</p>
          <p><strong>Memoria:</strong> a corto plazo y a largo plazo.</p>
        </div>
      </div>
      <table className="tabla piezas">
        <thead><tr><th>En la película</th><th>En el agente</th><th>Para qué sirve</th></tr></thead>
        <tbody>
          {PIEZAS.map((p) => (
            <tr key={p.concepto}><td>{p.pelicula}</td><td><strong>{p.concepto}</strong></td><td className="suave">{p.idea}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
