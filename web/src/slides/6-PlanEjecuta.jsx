import { useState } from 'react'

const PLAN_INICIAL = [
  { texto: 'Leer el informe del incidente', resultado: 'J.G. es el segundo intruso', falla: false },
  { texto: 'Buscar el coche abandonado', resultado: 'Dueño: Jonás Gamell', falla: false },
  { texto: 'Ir al taller y preguntar por él', resultado: 'Taller cerrado hace 3 días', falla: true },
]
const PASO_NUEVO = { texto: 'Ir a la calle del Faro, 7', resultado: 'Última dirección conocida', falla: false, nuevo: true }

// fase: 0 = plan escrito, 1..n = pasos ejecutados, 'replan' tras el fallo
export default function PlanEjecuta() {
  const [hechos, setHechos] = useState(0)
  const [plan, setPlan] = useState(PLAN_INICIAL)
  const fallo = plan.slice(0, hechos).some((p) => p.falla) && !plan.some((p) => p.nuevo)
  const terminado = hechos >= plan.length && !fallo

  const ejecutar = () => setHechos((h) => h + 1)
  const replanificar = () => { setPlan([...PLAN_INICIAL, PASO_NUEVO]) }
  const reiniciar = () => { setPlan(PLAN_INICIAL); setHechos(0) }

  return (
    <section className="dos-col">
      <div>
        <h2 className="titulo">Forma 2 · Plan-and-Execute: plan primero</h2>
        <p className="subtitulo">
          Primero escribe una lista de pasos. Luego los hace en orden. Si uno sale mal, <strong>rehace el plan</strong> (replanificar).
        </p>
        <table className="tabla">
          <thead><tr><th></th><th>ReAct</th><th>Plan-and-Execute</th></tr></thead>
          <tbody>
            <tr><td className="suave">El plan</td><td>No hay: decide sobre la marcha</td><td>Escrito al principio</td></tr>
            <tr><td className="suave">Bueno para</td><td>Cuando no sabes qué vas a encontrar</td><td>Tareas largas y ordenadas</td></tr>
            <tr><td className="suave">Riesgo</td><td>Dar vueltas sin avanzar</td><td>Seguir un plan que ya no sirve</td></tr>
          </tbody>
        </table>
        <p className="suave nota">En los apuntes verás cómo se pide el plan al LLM como una lista, usando <strong>Pydantic</strong>.</p>
      </div>

      <div>
        <div className="libreta" aria-live="polite">
          <p className="mano libreta-titulo">Plan: encontrar a J.G.</p>
          <ol>
            {plan.map((p, k) => {
              const hecho = k < hechos
              return (
                <li key={p.texto} className={`${hecho ? (p.falla ? 'falla' : 'hecho') : ''} ${p.nuevo ? 'nuevo' : ''}`}>
                  <span className="mano">{p.texto}</span>
                  {hecho && <span className="resultado">{p.falla ? '✗ ' : '✓ '}{p.resultado}</span>}
                </li>
              )
            })}
          </ol>
        </div>
        <div className="botones">
          {fallo ? (
            <button className="boton" onClick={replanificar}>Replanificar</button>
          ) : (
            <button className="boton" onClick={ejecutar} disabled={terminado}>
              {terminado ? 'Plan completado' : hechos === 0 ? 'Ejecutar el primer paso' : 'Ejecutar el siguiente paso'}
            </button>
          )}
          <button className="boton fantasma" onClick={reiniciar}>Reiniciar</button>
        </div>
      </div>
    </section>
  )
}
