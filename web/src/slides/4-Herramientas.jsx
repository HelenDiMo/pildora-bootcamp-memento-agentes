import { useState } from 'react'

// Paso 0: el LLM pide · Paso 1: el programa ejecuta · Paso 2: el LLM recibe el resultado
export default function Herramientas() {
  const [paso, setPaso] = useState(0)

  return (
    <section>
      <h2 className="titulo">El LLM pide, el programa ejecuta</h2>
      <p className="subtitulo">
        Una herramienta es una función normal de Python: por ejemplo, buscar en un archivo. El LLM no puede
        ejecutarla. Solo puede <strong>pedir</strong> que se use.
      </p>

      <div className="relevo">
        <div className={`relevo-caja ${paso >= 0 ? 'on' : ''}`}>
          <p className="relevo-quien">1. El LLM</p>
          <p>«Quiero usar <code>buscar_archivo</code> con el tema <code>informe</code>.»</p>
          <p className="suave">No responde con texto: responde con una petición.</p>
        </div>
        <div className={`relevo-flecha ${paso >= 1 ? 'on' : ''}`} aria-hidden="true">→</div>
        <div className={`relevo-caja ${paso >= 1 ? 'on' : ''}`}>
          <p className="relevo-quien">2. El programa</p>
          <p>Ejecuta la función de verdad y obtiene el resultado.</p>
          {paso >= 1 && <p className="relevo-dato">«Un testigo vio las iniciales J.G.»</p>}
        </div>
        <div className={`relevo-flecha ${paso >= 2 ? 'on' : ''}`} aria-hidden="true">→</div>
        <div className={`relevo-caja ${paso >= 2 ? 'on' : ''}`}>
          <p className="relevo-quien">3. El LLM otra vez</p>
          <p>Lee el resultado y decide: ¿ya puedo responder o pido otra herramienta?</p>
        </div>
      </div>

      <div className="botones">
        <button className="boton" onClick={() => setPaso(paso + 1)} disabled={paso >= 2}>
          {paso === 0 ? 'Ejecutar la herramienta' : 'Devolver el resultado al LLM'}
        </button>
        <button className="boton fantasma" onClick={() => setPaso(0)}>Reiniciar</button>
      </div>

      <p className="nota-mano mano">Ese ir y venir entre el LLM y el programa es el bucle del agente.</p>
    </section>
  )
}
