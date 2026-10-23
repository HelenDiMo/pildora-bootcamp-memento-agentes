export default function LangGraph() {
  return (
    <section>
      <h2 className="titulo">Memoria en LangGraph: hilos y almacén</h2>
      <p className="subtitulo">
        Dos piezas distintas. El checkpointer recuerda <strong>dentro de un hilo</strong>; el Store recuerda
        <strong> entre todos los hilos</strong>.
      </p>

      <svg className="hilos" viewBox="0 0 900 190" role="img" aria-label="Tres hilos separados; el Store está debajo y lo comparten todos">
        {['dia-1', 'dia-2', 'dia-3'].map((h, k) => (
          <g key={h} transform={`translate(${30 + k * 290} 10)`}>
            <rect width="250" height="88" rx="6" className="hilo" />
            <text x="14" y="26" className="hilo-t">thread_id = "{h}"</text>
            {[0, 1, 2, 3].map((m) => <rect key={m} x={14 + m * 56} y="42" width="44" height="28" rx="3" className="msj" />)}
            <line x1="125" y1="88" x2="125" y2="128" className="enlace" />
          </g>
        ))}
        <rect x="30" y="128" width="830" height="52" rx="6" className="store" />
        <text x="445" y="160" textAnchor="middle" className="store-t">Store: namespace ("leonard", "tatuajes")</text>
      </svg>

      <div className="dos-col codigos">
        <pre className="codigo">{`<span class="c"># Corto plazo: memoria del hilo</span>
<span class="k">from</span> langgraph.checkpoint.memory <span class="k">import</span> InMemorySaver

agente = grafo.compile(checkpointer=InMemorySaver())
config = {<span class="s">"configurable"</span>: {<span class="s">"thread_id"</span>: <span class="s">"dia-1"</span>}}
agente.invoke({<span class="s">"messages"</span>: [...]}, config)`.split('\n').map((l, k) => <span key={k} dangerouslySetInnerHTML={{ __html: l + '\n' }} />)}</pre>
        <pre className="codigo">{`<span class="c"># Largo plazo: memoria entre hilos</span>
<span class="k">from</span> langgraph.store.memory <span class="k">import</span> InMemoryStore
<span class="k">from</span> langgraph.config <span class="k">import</span> get_store

<span class="k">@tool</span>
<span class="k">def</span> tatuar(hecho: str, fuente: str):
    get_store().put((<span class="s">"leonard"</span>, <span class="s">"tatuajes"</span>), id, {...})

agente = grafo.compile(checkpointer=..., store=InMemoryStore())`.split('\n').map((l, k) => <span key={k} dangerouslySetInnerHTML={{ __html: l + '\n' }} />)}</pre>
      </div>
      <p className="suave nota">Ambos son «In Memory»: se borran al reiniciar el kernel. En producción se usan versiones con base de datos (por ejemplo, Postgres).</p>
    </section>
  )
}
