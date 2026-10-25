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
        Leonard se cree sus notas aunque alguien las haya cambiado. Un agente hace lo mismo: si en su memoria
        hay un dato falso, lo repite tan tranquilo.
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
            <li><strong>Apuntar de dónde sale</strong> cada dato (la fuente).</li>
            <li><strong>Pensar antes de guardar:</strong> no todo merece un tatuaje.</li>
            <li><strong>Comprobar antes de usar</strong> lo que no tiene una fuente fiable.</li>
            <li><strong>Fecha de caducidad:</strong> un dato antiguo puede haber cambiado.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
