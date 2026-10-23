import { useState } from 'react'
import { Espejo } from '../componentes.jsx'

const TATUAJES = [
  { hecho: 'El dueño del coche es Jonás Gamell', fuente: 'archivo: coche', falso: false },
  { hecho: 'J.G. sigue en la habitación 21 del motel', fuente: 'desconocida', falso: true },
]

export default function Envenenada() {
  const [defensa, setDefensa] = useState(false)
  return (
    <section>
      <h2 className="titulo">Memoria envenenada</h2>
      <p className="subtitulo">
        Leonard confía en sus notas aunque alguien las haya cambiado. Un agente hace lo mismo: un dato falso en
        memoria se repite con total seguridad.
      </p>

      <div className="dos-col">
        <div className="piel">
          {TATUAJES.map((t) => (
            <div key={t.hecho} className={`tatuaje-linea ${defensa && t.falso ? 'marcado' : ''}`}>
              <span className="tatuaje"><Espejo>{t.hecho}</Espejo></span>
              <span className="fuente">fuente: {t.fuente}</span>
            </div>
          ))}
          <p className="suave pista-espejo">Pasa el ratón por un tatuaje para leerlo en el espejo.</p>
        </div>

        <div>
          <div className="botones" role="group" aria-label="Modo del agente">
            <button className="boton fantasma" aria-pressed={!defensa} onClick={() => setDefensa(false)}>Sin defensa</button>
            <button className="boton fantasma" aria-pressed={defensa} onClick={() => setDefensa(true)}>Con defensa</button>
          </div>
          <div className="panel respuesta" aria-live="polite">
            <p className="suave">¿Dónde está J.G. ahora mismo?</p>
            {defensa ? (
              <p>
                Tengo un tatuaje que dice que está en el motel, pero <strong>no tiene fuente</strong>. Lo he comprobado:
                el archivo dice que dejó el motel hace 5 días. Su última dirección es calle del Faro, 7.
              </p>
            ) : (
              <p>Está en la habitación 21 del motel. Lo tengo tatuado.</p>
            )}
          </div>
          <ul className="lista defensas">
            <li><strong>Guardar la fuente</strong> de cada recuerdo.</li>
            <li><strong>Validar al escribir:</strong> no todo merece un tatuaje.</li>
            <li><strong>Comprobar antes de usar</strong> lo que no tiene fuente fiable.</li>
            <li><strong>Caducidad:</strong> un dato de hace semanas puede estar viejo.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
