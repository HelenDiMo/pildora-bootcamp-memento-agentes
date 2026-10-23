# 📸 Memento: diseño de agentes

**Masterclass del bootcamp: patrones de planificación y memoria de agentes**
Autora: Elena Díaz ([@HelenDiMo](https://github.com/HelenDiMo))

> ¿Y si tu agente de IA fuera Leonard Shelby? No recuerda nada por sí mismo y confía ciegamente en sus notas.

Una masterclass de 60 minutos sobre cómo diseñar agentes con **LangGraph**:

- **Planificación:** ReAct, Plan-and-Execute y Reflexión.
- **Memoria:** a corto plazo (hilos con *checkpointer*) y a largo plazo (*Store*).
- **Memoria envenenada:** qué pasa cuando el agente confía en un recuerdo falso.

El caso es una historia inventada, inspirada en la película *Memento* (2000).

## Estructura

```
├── notebooks/
│   ├── 01_live_coding_docente.ipynb    # lo que se programa en directo
│   ├── 02_reto_equipos_TODO.ipynb      # el reto por equipos (con huecos)
│   ├── 03_reto_equipos_solucion.ipynb  # la solución, para el code review
│   └── memento_kit.py                  # LLM, herramientas del caso y traza
├── docs/
│   ├── teoria.pdf / teoria.docx        # teoría completa
│   └── guion.md                        # guion de la sesión con tiempos
├── web/                                # presentación (React + Vite)
├── .env.example
└── requirements.txt
```

## Puesta en marcha

### 1. Instalar

```bash
git clone https://github.com/HelenDiMo/pildora-bootcamp-memento-agentes.git
cd pildora-bootcamp-memento-agentes
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Elegir un LLM (uno de los dos)

**Opción A: Ollama (local, sin clave)**

```bash
ollama pull llama3.1:8b          # pesa unos GB: descárgalo ANTES de clase
```

En el notebook, deja `PROVEEDOR = "ollama"`.

**Opción B: Groq (en la nube, gratis)**

1. Crea una clave gratuita en [console.groq.com](https://console.groq.com).
2. Copia la plantilla: `cp .env.example .env`
3. Pega tu clave en `.env`: `GROQ_API_KEY=gsk_...`

En el notebook, deja `PROVEEDOR = "groq"`.

> 🔒 El archivo `.env` está en `.gitignore`: **nunca subas tu clave a GitHub**.

### 3. Abrir los notebooks

Ábrelos desde la carpeta `notebooks/` (así encuentran `memento_kit.py`).

## Ver la presentación

```bash
cd web
npm install
npm run dev
```

Navega con las flechas ← → del teclado.

## El reto por equipos (22 min)

| Rol | Misión | Concepto |
|---|---|---|
| 🖋️ Tatuador | Implementar `tatuar` y `leer_tatuajes` | Memoria a largo plazo |
| 🔍 Revisor | Nodo que revisa la respuesta antes de entregarla | Reflexión |
| 🃏 Saboteador | Colar un tatuaje falso y defender al agente | Memoria envenenada |

## Problemas frecuentes

| Síntoma | Causa probable |
|---|---|
| `Falta GROQ_API_KEY` | No existe el archivo `.env` o la clave está vacía |
| Error 429 con Groq | Has llegado al límite gratuito: espera un minuto o usa Ollama |
| `ModuleNotFoundError: memento_kit` | El notebook no se abrió desde la carpeta `notebooks/` |
| El agente con Ollama no usa herramientas | El modelo no soporta *tool calling*: usa `llama3.1:8b` |

## Referencias

- Yao et al. (2022). [ReAct](https://arxiv.org/abs/2210.03629)
- Shinn et al. (2023). [Reflexion](https://arxiv.org/abs/2303.11366)
- Sumers et al. (2023). [CoALA](https://arxiv.org/abs/2309.02427)
- [Documentación de LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)

---

Código probado con LangGraph 1.2. *Memento* es una película de 2000 dirigida por Christopher Nolan; este proyecto no tiene relación con ella y no usa material de la película.
