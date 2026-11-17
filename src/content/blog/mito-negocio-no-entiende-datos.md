---
title: "Episodio 4 – El mito de que el negocio no entiende de gobierno de datos"
description: "El negocio ya responde las tres preguntas centrales del gobierno de datos todos los días. Solo no las llama así."
date: "2026-11-11"
newsletter: governance-chill
edicion: 4
image: "/blog-covers/mito-negocio-no-entiende-datos.png"
---

Pregúntale a un gerente de negocio quién es el "Data Owner" de su dominio. Es común obtener una de tres respuestas: silencio, un "sistemas, supongo" dicho con poca confianza, o el cargo equivocado (alguien de TI, rara vez alguien del propio negocio).

Es tentador leer eso como evidencia de que el negocio no entiende de gobierno de datos, y que hace falta "educarlo" antes de poder avanzar. Es un mito, y vale la pena desarmarlo con cuidado, porque sostiene una mala costumbre: la de empezar cualquier iniciativa de gobierno con un glosario de roles en vez de con una conversación en el idioma del negocio.

## El negocio ya responde las tres preguntas, solo que no en ese orden

Dale la vuelta a la pregunta y pregúntale por las consecuencias, no por el rol:

- "¿Quién tiene que responder si este número sale mal en el reporte del directorio?" La respuesta llega rápido, con nombre y apellido. Esa persona suele ser, en la práctica, quien ya ejerce buena parte de esa responsabilidad, aunque confirmar que tiene autoridad real sobre todo el dominio (y no solo sobre ese reporte puntual) siga siendo un paso aparte.
- "¿Qué valores no tienen ningún sentido en esta operación?" Un descuento negativo, una fecha de entrega anterior a la fecha del pedido, un cliente sin país. El negocio conoce estas reglas de memoria, aplicadas todos los días al revisar un reporte raro: son exactamente el tipo de reglas de calidad de datos que un programa de gobierno intenta formalizar.
- "¿Quién no debería ver esta información?" Sueldos, datos médicos, contratos en negociación. La respuesta también llega rápido, casi instintiva. Es la misma lógica detrás de la clasificación y el control de acceso a datos sensibles.

Ninguna de las tres respuestas usa vocabulario de gobierno de datos. Las tres son, sin embargo, exactamente lo que ese vocabulario intenta nombrar.

## Por qué esto importa más que corregir el vocabulario

Estas tres preguntas instintivas conectan con aspectos centrales de tres dominios de conocimiento del DAMA-DMBOK: accountability sobre un dominio de datos (Gobierno de Datos, Cap. 3), reglas que determinan si un dato es correcto (Calidad de Datos, Cap. 13), y control sobre quién accede a qué (Seguridad de Datos, Cap. 7). Esto no agota lo que cada uno de esos dominios cubre, son solo el punto de entrada más instintivo. Si esas tres funciones ya operan en la práctica, aunque sea de forma informal, instalarlas desde cero con un comité y un glosario nuevo que ignore ese conocimiento desperdicia lo que el negocio ya sabe. La formalización todavía aporta algo que lo informal no tiene: un responsable registrado en vez de sobreentendido, una regla escrita en vez de recordada de memoria, y continuidad cuando esa persona cambia de puesto. El riesgo del mito no es que formalizar sea innecesario. Es partir de cero en vez de partir de lo que el negocio ya practica.

Una consecuencia posible de este mito, cuando no se corrige: el programa de gobierno de datos termina con roles de papel que nadie en el negocio reconoce como propios, mientras las decisiones reales siguen viviendo en la cabeza de quien de verdad responde cuando el número sale mal, sin registro ni sucesor designado. Si esa persona cambia de puesto, ese conocimiento puede perderse con ella.

## Qué cambia si empiezas por las preguntas, no por los roles

En vez de preguntar "¿quién es el Data Owner?", pregunta "¿quién responde si esto sale mal?", y toma esa respuesta como punto de partida para confirmar el rol formal, no al revés. El mismo criterio aplica a calidad (pregunta por los valores imposibles antes de pedir reglas de validación) y a seguridad (pregunta por quién no debería ver algo antes de pedir una matriz de clasificación).

Por ejemplo: si la respuesta a "qué valores no tienen sentido" fue "un descuento negativo", ese requisito se convierte en una regla de validación concreta sobre el campo de descuento. Y cada vez que se ejecuta, debería dejar un registro de qué filas la violaron, no solo una alerta que alguien revisa una vez y olvida.

Nombrar con precisión quién tiene esa autoridad real, sobre qué datos y con qué criterio, es el tipo de decisión que el Trust Architecture Framework está pensado para hacer explícita, antes de que la conversación se desvíe hacia qué herramienta comprar. Puedes revisarlo en [/trust-architecture-framework](/trust-architecture-framework).

*Si alguna vez tuviste que traducir un rol de gobierno de datos al lenguaje real de tu negocio, sígueme en LinkedIn para la próxima edición de Governance & Chill, o cuéntame qué pregunta te funcionó mejor para encontrar al Data Owner real → https://www.linkedin.com/pulse/episodio-4-el-mito-de-que-negocio-entiende-gobierno-datos-edgar-pazos-w4zte/.*
