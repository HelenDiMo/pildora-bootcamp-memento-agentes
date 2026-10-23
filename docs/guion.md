# Guion de la sesión (60 min)

Diseño de agentes: patrones de planificación y memoria. Autora: Elena Díaz (@HelenDiMo)

Después hay otra masterclass: **el cierre no se mueve**.

## Antes de empezar

- [ ] Kernel reiniciado, `PROVEEDOR` correcto y una llamada de prueba hecha
- [ ] Web abierta en la diapositiva 1, notebook docente en la primera celda
- [ ] Enlaces del repo y de la web listos para pegar en el chat

## Bloque 1 · Contextualización (12 min): web

| Diap. | Min | Qué decir |
|---|---|---|
| 1 Portada | 1 | Espera a que el título se dé la vuelta. «Leonard escribía sus tatuajes al revés para leerlos en el espejo.» |
| 2 Leonard | 2 | Deja que el contador llegue a cero. «Esto le pasa a un LLM en cada llamada.» |
| 3 Agente | 2 | Las dos preguntas son el temario. Repasa la tabla película ↔ agente. |
| 4 ReAct | 2 | Pulsa «Reproducir». Señala cómo se ilumina el bucle agente ⇄ herramientas. |
| 5 Plan-and-Execute | 2 | Ejecuta los 3 pasos; el tercero falla; pulsa «Replanificar». |
| 6 Reflexión | 1 | Borrador → revisor → corregido. Menciona el coste extra. |
| 7 Memoria | 2 | Pulsa los cuatro objetos. Insiste en corto plazo vs largo plazo. |

Las diapositivas 8 y 9 se usan en el bloque 3.

## Bloque 2 · Live coding (18 min): `01_live_coding_docente.ipynb`

| Paso | Min | Momento clave |
|---|---|---|
| 0-1 | 3 | La segunda llamada no sabe tu nombre |
| 2 | 3 | `tool_calls`: el LLM pide, pero no ejecuta |
| 3 | 5 | Construir el grafo y leer la traza 🔧 👁 |
| 4 | 4 | Hilo 1 recuerda, hilo 2 no |
| 5 | 3 | Ver el plan aparecer y los pasos con ✅ |

**Si vas tarde:** salta el paso 5 y enséñalo con la diapositiva 5.

## Bloque 3 · Reto por equipos (22 min): `02_reto_equipos_TODO.ipynb`

1. Diapositiva 8 (1 min): checkpointer vs Store, la base del rol A.
2. Diapositiva 10: formar equipos, repartir roles y **comprobar que cada equipo tiene un LLM funcionando**. Pulsa «Empezar» en el cronómetro.
3. A mitad del reto, enseña la diapositiva 9 (memoria envenenada) para el rol C.

## Bloque 4 · Code review y cierre (8 min)

1. Un equipo enseña su solución (o abre `03_reto_equipos_solucion.ipynb`).
2. Preguntas del final del notebook: checkpointer vs Store, coste del revisor, ¿basta una regla en el prompt?
3. Diapositiva 11: los cuatro «tatuajes» del resumen y los recursos.

## Plan B

- **Groq da error 429:** cambiar a Ollama o seguir con la traza simulada de la diapositiva 4.
- **Sin wifi:** la web funciona en local (`npm run dev`) y sus animaciones no llaman a ningún LLM.

## Aviso para la clase (enviar antes del lunes)

> Para la masterclass del lunes sobre agentes necesitáis UNA de estas dos cosas:
> 1. **Ollama** con el modelo ya descargado: `ollama pull llama3.1:8b`
> 2. Una **clave gratuita de Groq** (2 minutos en console.groq.com)
>
> Y el repo clonado con las dependencias instaladas: [enlace al repo]. ¡Gracias!
