import { Polaroid, Escena } from '../componentes.jsx'
import { REPO } from '../componentes.jsx'

const RECURSOS = [
  { texto: 'ReAct (Yao et al., 2022)', url: 'https://arxiv.org/abs/2210.03629' },
  { texto: 'Reflexion (Shinn et al., 2023)', url: 'https://arxiv.org/abs/2303.11366' },
  { texto: 'CoALA: tipos de memoria (Sumers et al., 2023)', url: 'https://arxiv.org/abs/2309.02427' },
  { texto: 'Documentación de LangGraph', url: 'https://docs.langchain.com/oss/python/langgraph/overview' },
]

export default function Cierre() {
  return (
    <section className="dos-col izq-ancha">
      <div>
        <h2 className="titulo">Lo que Leonard se tatuaría</h2>
        <ol className="resumen">
          <li>Un agente es un LLM en bucle con herramientas. El LLM, por sí solo, no recuerda nada.</li>
          <li><strong>ReAct</strong> decide paso a paso; <strong>Plan-and-Execute</strong> escribe el plan antes; <strong>Reflexión</strong> revisa antes de entregar.</li>
          <li>Corto plazo = el hilo (checkpointer). Largo plazo = entre hilos (Store).</li>
          <li>La memoria también miente: guarda la fuente y comprueba antes de confiar.</li>
        </ol>
        <h3 className="recursos-t">Para seguir</h3>
        <ul className="lista">
          {RECURSOS.map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.texto}</a></li>)}
          <li><a href={REPO} target="_blank" rel="noreferrer">Repositorio de la masterclass</a></li>
        </ul>
      </div>
      <Polaroid pie="Gracias. ¿Preguntas?" ancho="min(280px, 70vw)" giro={3} revelar>
        <Escena tipo="faro" />
      </Polaroid>
    </section>
  )
}
