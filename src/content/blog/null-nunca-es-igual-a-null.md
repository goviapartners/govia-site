---
title: "Episodio 3 – ¿Por qué NULL nunca es igual a NULL?"
description: "Qué significa un NULL, por qué NULL = NULL no es verdadero, y por qué NOT NULL es un control real de calidad de datos."
date: "2026-11-11"
newsletter: governance-chill
edicion: 3
image: "/blog-covers/null-nunca-es-igual-a-null.png"
---

Dos formularios. En ambos, alguien dejó el campo "teléfono" en blanco. Antes de seguir leyendo, respóndete con honestidad: ¿esas dos personas tienen el mismo teléfono?

Si dijiste que sí, no estás solo. Dos casillas igual de vacías se ven idénticas. El problema es que "vacío" y "desconocido" no son el mismo problema, y SQL se toma esa diferencia muy en serio.

## Qué significa realmente un NULL

NULL no es un valor vacío, y tampoco es cero o una cadena en blanco. Es un marcador: dice que el valor de ese campo no está disponible en este momento. Lo que SQL no distingue por sí mismo es el motivo: puede ser que todavía no conozcas el dato (desconocido), o que ese dato simplemente no le corresponda a ese registro (no aplica). Para el motor, ambos casos son el mismo NULL.

Esa ambigüedad es justo lo que hace la comparación interesante: comparar dos ausencias de información no es lo mismo que comparar dos datos conocidos, aunque ambas casillas se vean igual de vacías. Si no sabes el teléfono de una persona, y tampoco el de otra, no tienes dos datos iguales; tienes dos vacíos que podrían resolverse en cualquier par de valores reales una vez que los conozcas.

## Por qué NULL = NULL no da verdadero

El SQL estándar no trabaja solo con verdadero y falso. Trabaja con una tercera opción: desconocido. Cuando el operador de igualdad (=) compara un NULL, sea contra un valor cualquiera o contra otro NULL, el resultado es desconocido, no verdadero ni falso.

En una cláusula WHERE, una fila cuya condición evalúa a desconocido se descarta exactamente igual que una fila cuya condición es falsa. Por eso, en la práctica, "NULL = NULL" se comporta como FALSE, aunque el motor nunca lo declare así de manera literal.

Esto explica un error clásico de quien recién aprende SQL: filtrar con "columna = NULL" y no entender por qué la consulta no devuelve nada. El operador de igualdad nunca puede responder esa pregunta. Para eso existen IS NULL e IS NOT NULL, que preguntan directamente por el estado del dato en vez de intentar compararlo.

Hay una trampa adicional, y es la parte que sorprende incluso a quien ya sabe lo anterior: esta regla aplica al operador =, pero no a todas las operaciones de SQL por igual. Si agrupas o deduplicas una columna con GROUP BY o SELECT DISTINCT, el motor sí trata a todos los NULL como si fueran el mismo valor, para efectos de agrupación. Dos NULL nunca son iguales cuando los comparas con =, pero sí terminan en el mismo grupo cuando los agrupas. No es una inconsistencia del motor: son dos operaciones distintas, comparar y agrupar, cada una con su propia regla, y confundirlas es una fuente real de errores.

Un ejemplo hipotético para verlo en consecuencia: una tabla de clientes con dos filas donde el campo "documento_identidad" quedó en NULL por un error de captura. Un JOIN que intente unir esas dos filas comparando esa columna con = nunca las va a encontrar coincidentes, exactamente por la regla de arriba. Pero un SELECT DISTINCT sobre esa misma columna sí va a colapsar ambos NULL en una sola fila de resultado. Dos operaciones, dos comportamientos, el mismo dato.

## Por qué esto no es trivia de sintaxis: el constraint NOT NULL

Un constraint NOT NULL es, en el fondo, un control de calidad de datos aplicado directamente en el esquema. No es la única forma de lograrlo (un CHECK que exija que la columna no sea NULL hace lo mismo), pero es la más directa y la que casi todos los motores reconocen como tal. Se puede describir con las mismas capas de Governance as Code:

- La política: ciertos campos no pueden quedar en un estado desconocido, porque de ellos depende identificar, conciliar o decidir sobre un registro.
- El estándar: la columna correspondiente debe definirse como NOT NULL (o su equivalente) en el modelo de datos.
- El control: el motor rechaza cualquier inserción o actualización que intente dejar esa columna sin valor. La verificación ocurre sola, en cada operación.
- La evidencia: que ese rechazo quede registrado depende de cómo esté configurado el logging de cada motor, pero el punto de diseño importante es que el intento se bloquea en el momento, no que se silencie convirtiéndose en un valor de relleno.
- La excepción: imagina que, durante una migración puntual, alguien autoriza temporalmente NULL en una columna mientras se completa una carga histórica de datos. Esa es una desviación real del estándar, y como toda excepción, necesita motivo, responsable y fecha de vencimiento, no solo desactivarse en silencio.

NOT NULL tampoco garantiza que el valor tenga sentido, solo que no esté ausente.

## Cómo decidir qué campos necesitan NOT NULL

No conviene aplicar NOT NULL a todo por reflejo. Forzar un valor donde legítimamente no existe todavía, o donde el campo simplemente no aplica a cierto tipo de registro (la fecha de baja de un cliente que sigue activo, por ejemplo), suele producir algo peor que un NULL: un placeholder disfrazado de dato real, como una fecha "01/01/1900" o un texto "N/A" que después alguien intenta promediar o agrupar como si fuera información válida.

La pregunta que ordena la decisión es simple: ¿"no disponible" es un estado legítimo para este campo, o esta columna participa en identidad, uniones o reglas de negocio donde esa ambigüedad es peligrosa? Si es lo segundo, el campo necesita NOT NULL, y probablemente también una fuente confiable que garantice el valor en el momento de la captura, porque la restricción por sí sola impide el marcador NULL, no garantiza que el dato capturado sea correcto.

Esto, en el fondo, es una decisión de gobierno de datos que vale la pena hacer explícita, más allá de una casilla técnica en el DDL. El Trust Architecture Framework existe precisamente para este tipo de decisión: hacer visible quién decide qué campos son críticos y bajo qué criterio, antes de que la conversación se reduzca a una discusión de sintaxis. Puedes revisarlo en [/trust-architecture-framework](/trust-architecture-framework).

*Si alguna vez te sorprendió un "= NULL" que no devolvía nada, sígueme en LinkedIn para la próxima edición de Governance & Chill, o cuéntame qué columna de tu propio modelo debería tener NOT NULL y todavía no lo tiene → [https://www.linkedin.com/pulse/episodio-3-por-qu%C3%A9-null-nunca-es-igual-edgar-pazos-akgoe/](https://www.linkedin.com/pulse/episodio-3-por-qu%C3%A9-null-nunca-es-igual-edgar-pazos-akgoe/).*
