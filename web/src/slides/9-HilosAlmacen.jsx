export default function HilosAlmacen() {
  return (
    <section>
      <h2 className="titulo">En código: hilos y almacén</h2>
      <p className="subtitulo">
        En LangGraph, la librería que usamos, cada tipo de memoria tiene su pieza.
      </p>

      <svg className="hilos" viewBox="0 0 900 190" role="img" aria-label="Tres conversaciones separadas; debajo, un almacén que comparten todas">
        {['conversación 1', 'conversación 2', 'conversación 3'].map((h, k) => (
          <g key={h} transform={`translate(${30 + k * 290} 10)`}>
            <rect width="250" height="88" rx="6" className="hilo" />
            <text x="14" y="26" className="hilo-t">{h}</text>
            {[0, 1, 2, 3].map((m) => <rect key={m} x={14 + m * 56} y="42" width="44" height="28" rx="3" className="msj" />)}
            <line x1="125" y1="88" x2="125" y2="128" className="enlace" />
          </g>
        ))}
        <rect x="30" y="128" width="830" height="52" rx="6" className="store" />
        <text x="445" y="160" textAnchor="middle" className="store-t">almacén: los tatuajes de Leonard</text>
      </svg>

      <div className="dos-col explicacion">
        <div className="panel">
          <h3>Corto plazo → <code>checkpointer</code></h3>
          <p>Guarda cada conversación por separado. Cada una tiene un nombre: el <code>thread_id</code> (hilo).</p>
          <p className="suave">Mismo hilo: recuerda. Hilo nuevo: empieza en blanco.</p>
        </div>
        <div className="panel">
          <h3>Largo plazo → <code>Store</code> (almacén)</h3>
          <p>Una libreta que comparten <strong>todas</strong> las conversaciones. Se guarda con <code>put</code> y se busca con <code>search</code>.</p>
          <p className="suave">Es lo que vas a programar en el ejercicio.</p>
        </div>
      </div>
    </section>
  )
}
