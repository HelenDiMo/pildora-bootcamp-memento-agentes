import { useState } from 'react'
import { Polaroid, Escena, Espejo } from '../componentes.jsx'

const TIPOS = {
  corto: {
    nombre: 'Corto plazo',
    pelicula: 'Lo que Leonard tiene en la cabeza ahora mismo. Se le olvida en unos minutos.',
    agente: 'La conversación que estás teniendo ahora con él.',
    dura: 'Solo mientras dura esa conversación.',
  },
  semantica: {
    nombre: 'Largo plazo: datos',
    pelicula: 'Los tatuajes: cosas que da por ciertas.',
    agente: 'Datos que guarda para siempre: «el dueño del coche es Jonás Gamell».',
    dura: 'Siempre, aunque empiece otra conversación.',
  },
  episodica: {
    nombre: 'Largo plazo: experiencias',
    pelicula: 'Las polaroids: momentos concretos que vivió.',
    agente: 'Ejemplos de tareas que ya hizo, para hacerlas mejor la próxima vez.',
    dura: 'Siempre.',
  },
  procedimental: {
    nombre: 'Largo plazo: costumbres',
    pelicula: 'Su rutina: siempre mira sus notas antes de actuar.',
    agente: 'Sus instrucciones: cómo tiene que comportarse.',
    dura: 'Siempre (y se pueden ir mejorando).',
  },
}

export default function Memoria() {
  const [sel, setSel] = useState('corto')
  const t = TIPOS[sel]
  const boton = (id, contenido, clase) => (
    <button className={`objeto ${clase} ${sel === id ? 'sel' : ''}`} onClick={() => setSel(id)} aria-pressed={sel === id}>
      {contenido}
      <span className="objeto-nombre">{TIPOS[id].nombre}</span>
    </button>
  )

  return (
    <section>
      <h2 className="titulo">La memoria de un agente</h2>
      <p className="subtitulo">
        Lo importante es la diferencia entre <strong>corto plazo</strong> (esta conversación) y <strong>largo plazo</strong> (para
        siempre). El largo plazo se suele dividir en tres. Pulsa cada objeto.
      </p>
      <div className="dos-col izq-ancha memoria">
        <div className="objetos">
          {boton('corto', <span className="mano post-it">Helen busca a J.G.<br />(no lo olvides…)</span>, 'o-corto')}
          {boton('semantica', <span className="tatuaje"><Espejo retraso={sel === 'semantica' ? 300 : null}>Jonás Gamell, mecánico</Espejo></span>, 'o-sem')}
          {boton('episodica', <Polaroid pie="Volví al motel. Ya no estaba." ancho={130} giro={3}><Escena tipo="motel" /></Polaroid>, 'o-epi')}
          {boton('procedimental', <span className="ficha mano">1. No te fíes de tu cabeza<br />2. Mira tus notas<br />3. Apunta de dónde sale</span>, 'o-proc')}
        </div>
        <div className="panel detalle" aria-live="polite">
          <h3>{t.nombre}</h3>
          <dl>
            <dt>En la película</dt><dd>{t.pelicula}</dd>
            <dt>En un agente</dt><dd>{t.agente}</dd>
            <dt>¿Cuánto dura?</dt><dd>{t.dura}</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
