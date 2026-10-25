const PIEZAS = [
  { pelicula: 'Leonard', concepto: 'El LLM', idea: 'Piensa y decide, pero no recuerda.' },
  { pelicula: 'El archivo policial', concepto: 'Herramientas', idea: 'Funciones que puede pedir usar para conseguir datos.' },
  { pelicula: 'Su forma de investigar', concepto: 'Planificación', idea: 'Cómo decide qué hacer a continuación.' },
  { pelicula: 'Polaroids y tatuajes', concepto: 'Memoria', idea: 'Lo que apunta para no empezar de cero.' },
]

export default function Agente() {
  return (
    <section>
      <h2 className="titulo">¿Qué es un agente?</h2>
      <p className="ecuacion">
        <span>LLM</span><b>+</b><span>herramientas</span><b>+</b><span>repetir</span><b>=</b><span className="destaca">agente</span>
      </p>
      <p className="subtitulo">
        Un agente es un LLM que puede usar herramientas y que lo intenta varias veces hasta conseguir la respuesta.
        En cada intento se hace dos preguntas, que son el temario de hoy:
      </p>
      <div className="preguntas">
        <div className="panel">
          <p className="mano pregunta">«¿Qué hago ahora?»</p>
          <p><strong>Planificación.</strong> Veremos tres formas de decidirlo.</p>
        </div>
        <div className="panel">
          <p className="mano pregunta">«¿Qué ha pasado hasta ahora?»</p>
          <p><strong>Memoria.</strong> Cómo guardar lo importante.</p>
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
