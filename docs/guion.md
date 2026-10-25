# Guion de la sesión (60 min)

Diseño de agentes: patrones de planificación y memoria. Autora: Elena Díaz (@HelenDiMo)

Va **después de otra masterclass**: la gente llegará cansada. Sin live coding: **las diapositivas lo explican todo** y el código queda en los apuntes (`01_apuntes.ipynb`) para leerlo con calma.

| Bloque | Min | Con qué |
|---|---|---|
| 1. Explicación | 28 | Diapositivas 1-10 |
| 2. Ejercicio individual | 22 | Diapositiva 11 + `02_reto_individual_TODO.ipynb` |
| 3. Cierre | 8 | Diapositiva 12 |
| Margen | 2 | |

## Antes de empezar

- [ ] Web abierta en la diapositiva 1
- [ ] `02_reto_individual_TODO.ipynb` abierto, con el kernel ya conectado, por si hay que enseñar algo
- [ ] Enlaces del repo y de la web listos para pegar en el chat

## Bloque 1 · Explicación (28 min)

**La idea que tienen que llevarse:** un agente es un LLM que pide herramientas y repite hasta tener la respuesta. Planificar es cómo decide qué hacer; memoria es cómo no empezar de cero.

| Diap. | Min | Qué decir (en sencillo) | Qué tocar |
|---|---|---|---|
| 1 Portada | 1 | «Hoy vamos a hablar de agentes a través de Leonard, el de *Memento*, que no puede guardar recuerdos nuevos.» | Espera a que el título se dé la vuelta: «Leonard escribía sus tatuajes al revés para leerlos en el espejo». |
| 2 Leonard | 2 | «A un LLM le pasa lo mismo: cada mensaje lo lee desde cero. Si un chat parece recordar, es porque le reenvían toda la conversación.» | Deja que el contador llegue a cero. |
| 3 Agente | 3 | «Un agente es un LLM + herramientas + repetir. En cada vuelta se pregunta dos cosas: qué hago ahora y qué ha pasado. Eso es planificación y memoria.» | Lee la tabla película ↔ agente. |
| 4 Herramientas | 3 | «Una herramienta es una función de Python. Ojo: el LLM no la ejecuta, solo pide usarla. El programa la ejecuta y le devuelve el resultado. Ese ir y venir es el bucle del agente.» | Pulsa los dos botones despacio. |
| 5 ReAct | 4 | «Primera forma de decidir: paso a paso. No hay plan; mira la última pista y decide la siguiente. Como un detective que tira del hilo.» | «Siguiente paso» uno a uno. Señala que cada pista lleva a la siguiente. |
| 6 Plan-and-Execute | 3 | «Segunda forma: primero escribe una lista de pasos y luego los hace. Si uno falla, rehace el plan.» | Ejecuta los 3 pasos; el tercero falla; «Replanificar». |
| 7 Reflexión | 2 | «Tercera forma: antes de responder, un revisor comprueba la respuesta. Más fiable, pero más lento y caro.» | Borrador → revisor → corregido. |
| 8 Memoria | 4 | «Lo importante: corto plazo es esta conversación; largo plazo es para siempre. El largo plazo se divide en datos, experiencias y costumbres.» | Pulsa los cuatro objetos. |
| 9 Hilos y almacén | 3 | «En código: el checkpointer guarda cada conversación con un nombre, el hilo. El Store es una libreta que comparten todas. El Store es lo que vais a programar.» | — |
| 10 Envenenada | 3 | «Si alguien mete un dato falso en la memoria, el agente se lo cree. ¿Cómo lo evitamos?» | «Sin defensa» → «Con defensa». Pasa el ratón por los tatuajes. |

**Si vas tarde:** acorta la 7 (Reflexión) a una frase; es la misión extra del ejercicio.

## Bloque 2 · Ejercicio individual (22 min)

1. Diapositiva 11: explica las 3 misiones y pulsa «Empezar» en el cronómetro.
2. Recuérdales que solo tienen que escribir donde pone `# TODO`.
3. Quien no tenga LLM puede abrir `03_reto_individual_solucion.ipynb` y leer la traza.

| Misión | Qué hacen | Tiempo |
|---|---|---|
| 1 · Tatuar | Completar 2 líneas (`store.put` y `store.search`) | ~8 min |
| 2 · El tatuaje falso | Ejecutar el ataque y escribir una regla en español | ~8 min |
| 3 · Extra: el revisor | Opcional, para quien vaya rápido | el resto |

## Bloque 3 · Cierre (8 min)

1. Pide a alguien que lea su regla de la misión 2. ¿Ha funcionado?
2. Pregunta: «¿Basta una frase en el prompt para protegerse?» (No del todo: mejor apuntar de dónde sale cada dato y comprobarlo.)
3. Diapositiva 12: los cuatro «tatuajes» del resumen. Recuérdales que en `01_apuntes.ipynb` tienen todo el código explicado paso a paso.

## Preguntas que te pueden hacer

| Pregunta | Respuesta sencilla |
|---|---|
| ¿Qué es LangGraph? | Una librería para montar agentes como un dibujo de cajas y flechas: cada caja hace una cosa y las flechas dicen a cuál ir después. |
| ¿Qué diferencia hay entre LangChain y LangGraph? | LangChain da las piezas (LLM, herramientas); LangGraph las organiza en un bucle con memoria. |
| ¿Por qué se llama ReAct? | De *Reasoning + Acting*: razonar y actuar, alternando. |
| ¿El modelo de Ollama es igual de bueno que ChatGPT? | No: es mucho más pequeño. Por eso a veces hace cosas raras, pero para aprender va bien. |
| ¿Dónde se guarda la memoria de verdad? | En el ejercicio, en la memoria del ordenador (se borra al reiniciar). En una aplicación real, en una base de datos. |

## Plan B

- **El LLM falla en el ejercicio:** que abran `03_reto_individual_solucion.ipynb` y lean la traza.
- **Sin wifi:** la web funciona en local (`npm run dev`) y sus animaciones no llaman a ningún LLM.

## Aviso para la clase (enviar antes del lunes)

> Para la masterclass del lunes sobre agentes necesitáis UNA de estas dos cosas:
> 1. **Ollama** con el modelo ya descargado: `ollama pull llama3.1:8b`
> 2. Una **clave gratuita de Groq** (2 minutos en console.groq.com)
>
> Y el repo clonado con las dependencias instaladas: [enlace al repo]. ¡Gracias!
