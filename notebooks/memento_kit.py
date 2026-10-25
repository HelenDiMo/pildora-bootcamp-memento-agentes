"""
memento_kit.py — Kit común de la masterclass «Diseño de agentes: planificación y memoria»
Autora: Elena Díaz (@HelenDiMo)

Contiene lo que NO es el objetivo de la clase, para que los notebooks se centren
en los conceptos:
  - get_llm(): elegir el LLM (Groq u Ollama) con una sola línea.
  - Las herramientas del caso (archivo policial y polaroids de Leonard).
  - mostrar_traza(): imprime la traza del agente (pensamiento → acción → observación).

El caso es una historia inventada inspirada en la película Memento (2000).
"""

from __future__ import annotations

import os

from dotenv import load_dotenv
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool

load_dotenv()

# ---------------------------------------------------------------------------
# 1. Elegir el LLM
# ---------------------------------------------------------------------------
MODELO_GROQ = "llama-3.3-70b-versatile"
MODELO_OLLAMA = "llama3.1:8b"


def get_llm(proveedor: str = "groq", temperature: float = 0.0):
    """Devuelve un chat model de LangChain.

    proveedor: "groq"   → necesita GROQ_API_KEY en el archivo .env
               "ollama" → necesita Ollama arrancado y el modelo descargado
                          (ollama pull llama3.1:8b)
    """
    proveedor = proveedor.lower().strip()
    if proveedor == "groq":
        if not os.getenv("GROQ_API_KEY"):
            raise RuntimeError(
                "Falta GROQ_API_KEY. Copia .env.example como .env y pega tu clave "
                "(se crea gratis en https://console.groq.com)."
            )
        from langchain_groq import ChatGroq

        return ChatGroq(model=os.getenv("MODELO_GROQ", MODELO_GROQ), temperature=temperature)
    if proveedor == "ollama":
        from langchain_ollama import ChatOllama

        # num_predict: tope de tokens por respuesta, para que un modelo pequeño no se quede
        # generando texto sin parar
        return ChatOllama(model=os.getenv("MODELO_OLLAMA", MODELO_OLLAMA), temperature=temperature,
                          num_predict=512)
    raise ValueError('proveedor debe ser "groq" u "ollama"')


# ---------------------------------------------------------------------------
# 2. El caso (datos inventados)
# ---------------------------------------------------------------------------
ARCHIVO_POLICIAL = {
    "informe": (
        "INFORME DEL INCIDENTE: la noche del ataque entraron dos intrusos. Uno fue "
        "abatido; el segundo huyó. Un testigo vio las iniciales «J.G.» bordadas en su chaqueta "
        "y lo vio correr hacia el motel de la carretera."
    ),
    "motel": (
        "REGISTRO DEL MOTEL: la habitación 21 se alquiló hace dos semanas a nombre de "
        "«J. Gamell». Dejó apuntada la matrícula de su coche, una berlina gris. "
        "Dejó la habitación hace 5 días."
    ),
    "coche": (
        "COCHE ABANDONADO: una berlina gris junto al puerto. La matrícula coincide con la del "
        "motel y pertenece a Jonás Gamell, mecánico del taller Puerto Norte."
    ),
    "taller": (
        "TALLER PUERTO NORTE: cerró hace 3 días. Su dueño, Jonás Gamell, dejó como "
        "dirección de contacto: calle del Faro, 7."
    ),
}

POLAROIDS = {
    "teddy": "TEDDY — dice que es policía. Me ayuda con el caso. ¿Fiarme?",
    "natalie": "NATALIE — trabaja en el bar. Me habló del motel.",
    "motel": "MOTEL — habitación 21. Volver mañana.",
}


@tool
def buscar_archivo(tema: str) -> str:
    """Busca en el archivo policial. Temas disponibles: informe, motel, coche, taller."""
    texto = ARCHIVO_POLICIAL.get(tema.lower().strip())
    if texto is None:
        return f"No hay nada sobre «{tema}». Temas disponibles: {', '.join(ARCHIVO_POLICIAL)}."
    return texto


@tool
def ver_polaroid(nombre: str) -> str:
    """Mira la polaroid de Leonard con ese nombre. Polaroids: teddy, natalie, motel."""
    nota = POLAROIDS.get(nombre.lower().strip())
    if nota is None:
        return f"No hay polaroid de «{nombre}». Polaroids: {', '.join(POLAROIDS)}."
    return nota


HERRAMIENTAS_CASO = [buscar_archivo, ver_polaroid]

PROMPT_LEONARD = (
    "Eres Leonard, un investigador que no puede crear recuerdos nuevos. "
    "Solo sabes lo que te dicen tus herramientas y tus notas; no inventes datos. "
    "Investiga paso a paso y usa UNA sola herramienta en cada paso, nunca varias a la vez. "
    "Después de cada pista, piensa qué te falta y, si la pista no "
    "responde a la pregunta completa, vuelve a usar una herramienta. "
    "Cada pista suele llevar a la siguiente (por ejemplo, un nombre lleva a un lugar). "
    "Temas del archivo policial: informe, motel, coche, taller. "
    "No respondas hasta tener toda la información que se pide o haber revisado todos los temas útiles. "
    "Tu respuesta final debe contestar directamente a la pregunta, en español, breve, "
    "y citar las pistas que usaste."
)


# ---------------------------------------------------------------------------
# 3. Ver la traza del agente
# ---------------------------------------------------------------------------
def mostrar_traza(mensajes) -> None:
    """Imprime cada paso del agente: 🗣 pregunta, 💭 pensamiento/respuesta, 🔧 acción, 👁 observación."""
    for m in mensajes:
        if isinstance(m, SystemMessage):
            continue
        if isinstance(m, HumanMessage):
            print(f"\n🗣  {m.content}")
        elif isinstance(m, AIMessage):
            if m.content:
                print(f"💭 {m.content}")
            for llamada in m.tool_calls or []:
                print(f"🔧 {llamada['name']}({llamada['args']})")
        elif isinstance(m, ToolMessage):
            print(f"👁  {m.content}")
