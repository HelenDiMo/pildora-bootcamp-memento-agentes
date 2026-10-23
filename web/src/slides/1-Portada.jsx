import { Polaroid, Escena, Espejo } from '../componentes.jsx'

export default function Portada() {
  return (
    <section className="portada">
      <Polaroid pie="¿Quién es J.G.? No lo olvides." ancho="min(300px, 70vw)" giro={-4} revelar>
        <Escena tipo="pregunta" />
      </Polaroid>

      <div className="portada-texto">
        <h1 className="titulo portada-titulo">
          <Espejo retraso={1400}>Diseño de agentes</Espejo>
        </h1>
        <p className="portada-sub">Patrones de planificación y memoria</p>
        <p className="suave">
          Un agente de IA es como Leonard, el protagonista de <em>Memento</em> (2000): no recuerda nada
          por sí mismo y depende de un método y de sus notas.
        </p>
        <p className="portada-pista mano">Usa las flechas ← → del teclado</p>
      </div>
    </section>
  )
}
