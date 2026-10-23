import { useState } from 'react'
import { Polaroid, Escena, Espejo } from '../componentes.jsx'

const TIPOS = {
  corto: {
    nombre: 'Corto plazo',
    pelicula: 'Lo que Leonard tiene en la cabeza ahora mismo. Dura unos minutos.',
    agente: 'El historial de la conversación actual (el hilo).',
    langgraph: 'Un checkpointer, identificado por thread_id.',
  },
  semantica: {
    nombre: 'Largo plazo: semántica',
    pelicula: 'Los tatuajes: hechos que considera verdades.',
    agente: 'Datos sobre el usuario o el mundo: «el dueño del coche es Jonás Gamell».',
    langgraph: 'Un Store: put() y search() en un namespace.',
  },
  episodica: {
    nombre: 'Largo plazo: episódica',
    pelicula: 'Las polaroids: momentos concretos que vivió.',
    agente: 'Ejemplos de tareas pasadas que se recuperan para hacerlo mejor.',
    langgraph: 'También un Store, guardando ejemplos completos.',
  },
  procedimental: {
    nombre: 'Largo plazo: procedimental',
    pelicula: 'Su rutina: siempre mira sus notas antes de actuar.',
    agente: 'Las instrucciones del prompt, que el agente puede ir ajustando.',
    langgraph: 'El prompt del sistema (guardado y actualizado en un Store).',
  },
}

export default function Memoria() {
  const [sel, setSel] = useState('semantica')
  const t = TIPOS[sel]
  const boton = (id, contenido, clase) => (
    <button className={`objeto ${clase} ${sel === id ? 'sel' : ''}`} onClick={() => setSel(id)} aria-pressed={sel === id}>
      {contenido}
      <span className="objeto-nombre">{TIPOS[id].nombre}</span>
    </button>
  )

  return (
    <section>
      <h2 className="titulo">Cuatro tipos de memoria</h2>
      <p className="subtitulo">Pulsa cada objeto. La clasificación viene del marco CoALA, el mismo que usa la documentación de LangGraph.</p>
      <div className="dos-col izq-ancha memoria">
        <div className="objetos">
          {boton('corto', <span className="mano post-it">Helen busca a J.G.<br />(no lo olvides…)</span>, 'o-corto')}
          {boton('semantica', <span className="tatuaje"><Espejo retraso={sel === 'semantica' ? 300 : null}>Jonás Gamell, mecánico</Espejo></span>, 'o-sem')}
          {boton('episodica', <Polaroid pie="Volví al motel. Ya no estaba." ancho={130} giro={3}><Escena tipo="motel" /></Polaroid>, 'o-epi')}
          {boton('procedimental', <span className="ficha mano">1. No te fíes de tu cabeza<br />2. Mira tus notas<br />3. Anota la fuente</span>, 'o-proc')}
        </div>
        <div className="panel detalle" aria-live="polite">
          <h3>{t.nombre}</h3>
          <dl>
            <dt>En la película</dt><dd>{t.pelicula}</dd>
            <dt>En un agente</dt><dd>{t.agente}</dd>
            <dt>En LangGraph</dt><dd>{t.langgraph}</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
