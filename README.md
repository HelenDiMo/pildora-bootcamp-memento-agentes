# 📸 Memento: diseño de agentes

**Masterclass del bootcamp: patrones de planificación y memoria de agentes**
Autora: Elena Díaz ([@HelenDiMo](https://github.com/HelenDiMo))

> ¿Y si tu agente de IA fuera Leonard Shelby? No recuerda nada por sí mismo y confía ciegamente en sus notas.

Una masterclass de 60 minutos sobre cómo diseñar agentes con **LangGraph**, explicada con lenguaje sencillo:

- **Planificación:** ReAct, Plan-and-Execute y Reflexión.
- **Memoria:** a corto plazo (hilos con *checkpointer*) y a largo plazo (*Store*).
- **Memoria envenenada:** qué pasa cuando el agente confía en un recuerdo falso.

El caso es una historia inventada, inspirada en la película *Memento* (2000).

## Estructura

```
├── notebooks/
│   ├── 01_apuntes.ipynb                # todo el código, explicado paso a paso
│   ├── 02_reto_individual_TODO.ipynb   # el reto individual (con huecos)
│   ├── 03_reto_individual_solucion.ipynb  # la solución
│   └── memento_kit.py                  # LLM, herramientas del caso y traza
├── docs/
│   ├── teoria.pdf / teoria.docx        # teoría completa
│   └── guion.md                        # guion de la sesión con tiempos
├── web/                                # presentación (React + Vite)
├── .env.example
└── requirements.txt
```

## Qué necesitas

- **Python 3.10 o superior** (probado con 3.12).
- **VS Code** con la extensión **Jupyter**, para abrir los notebooks.
- **Un LLM:** Ollama en tu ordenador o una clave gratuita de Groq (ver paso 2).
- **Node.js 20.19 o superior**, solo si quieres abrir la presentación en tu ordenador.

## Puesta en marcha

### 1. Instalar

```bash
git clone https://github.com/HelenDiMo/pildora-bootcamp-memento-agentes.git
cd pildora-bootcamp-memento-agentes
python -m venv .venv
source .venv/bin/activate        # Mac / Linux
# Windows con Git Bash:   source .venv/Scripts/activate
# Windows con PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

> ⚠️ **Windows:** si al instalar sale un error `OSError: [Errno 2] No such file or directory` con un aviso de *Long Path*, la ruta de tu carpeta es demasiado larga. Crea el entorno en una ruta corta, fuera del repo:
> ```bash
> python -m venv /d/venvs/memento
> source /d/venvs/memento/Scripts/activate
> pip install -r requirements.txt
> ```

### 2. Elegir un LLM (uno de los dos)

**Opción A: Ollama (local, sin clave)**

```bash
ollama pull llama3.1:8b          # pesa unos GB: descárgalo ANTES de clase
```

En la primera celda de cada notebook, pon `PROVEEDOR = "ollama"` (viene así por defecto).

**Opción B: Groq (en la nube, gratis)**

1. Crea una clave gratuita en [console.groq.com](https://console.groq.com).
2. Copia la plantilla: `cp .env.example .env`
3. Pega tu clave en `.env`: `GROQ_API_KEY=gsk_...`

En la primera celda de cada notebook, pon `PROVEEDOR = "groq"`.

> 🔒 El archivo `.env` está en `.gitignore`: **nunca subas tu clave a GitHub**.

### 3. Abrir los notebooks

Ábrelos desde la carpeta `notebooks/` (así encuentran `memento_kit.py`).

1. `01_apuntes.ipynb`: léelo y ejecútalo a tu ritmo. Explica todo con código.
2. `02_reto_individual_TODO.ipynb`: el ejercicio. Solo tienes que escribir donde pone `# TODO`.
3. `03_reto_individual_solucion.ipynb`: la solución, por si te atascas.

**Elegir el kernel en VS Code:** arriba a la derecha del notebook, pulsa **Select Kernel → Python Environments** y elige tu entorno (`.venv` o `memento`). Si no aparece, regístralo con:

```bash
python -m ipykernel install --user --name memento --display-name "Memento (Python)"
```

Después recarga VS Code y elígelo en **Select Kernel → Jupyter Kernel**.

## Ver la presentación

```bash
cd web
npm install
npm run dev
```

Navega con las flechas ← → del teclado (Inicio y Fin van a la primera y la última diapositiva).

### Publicarla en Vercel

Importa el repo en Vercel y, en **Settings → Root Directory**, elige la carpeta **`web`**. El archivo `web/vercel.json` ya le dice que es un proyecto Vite.

## El reto individual (22 min, en clase o en casa)

| Misión | Qué haces | Concepto |
|---|---|---|
| 🖋️ 1 · Tatuar | Completar 2 líneas para guardar y leer en el Store | Memoria a largo plazo |
| 🃏 2 · El tatuaje falso | Ver el ataque y escribir una regla en español | Memoria envenenada |
| 🔍 3 · Extra: el revisor | Opcional: otro paso del LLM revisa la respuesta | Reflexión |

## Problemas frecuentes

| Síntoma | Causa probable |
|---|---|
| `Falta GROQ_API_KEY` | No existe el archivo `.env` o la clave está vacía |
| Error 429 con Groq | Has llegado al límite gratuito: espera un minuto o usa Ollama |
| `activate: No such file or directory` en Git Bash | Usa `source .venv/Scripts/activate` (con `/` y `Scripts`, no `bin`) |
| Windows: `OSError: [Errno 2] No such file or directory` al instalar, con un aviso de *Long Path* | La ruta de tu carpeta es demasiado larga (límite de 260 caracteres). Crea el entorno en una ruta corta: `python -m venv /d/venvs/memento` y `source /d/venvs/memento/Scripts/activate`, y elige ese Python como kernel en VS Code |
| VS Code no muestra mi entorno como kernel | Regístralo con `python -m ipykernel install --user --name memento` y elígelo en **Select Kernel → Jupyter Kernel** |
| `npm run dev` da error al arrancar | Tu Node.js es antiguo: instala la versión 20.19 o superior |
| `ModuleNotFoundError: memento_kit` | El notebook no se abrió desde la carpeta `notebooks/` |
| El agente con Ollama no usa herramientas | El modelo no soporta *tool calling*: usa `llama3.1:8b` |

## Referencias

- Yao et al. (2022). [ReAct](https://arxiv.org/abs/2210.03629)
- Shinn et al. (2023). [Reflexion](https://arxiv.org/abs/2303.11366)
- Sumers et al. (2023). [CoALA](https://arxiv.org/abs/2309.02427)
- [Documentación de LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)

---

Código probado con LangGraph 1.2. *Memento* es una película de 2000 dirigida por Christopher Nolan; este proyecto no tiene relación con ella y no usa material de la película.
