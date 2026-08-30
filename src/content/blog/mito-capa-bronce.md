---
title: "Episodio 1 – El mito de que Bronce es la capa sucia"
description: "Por qué decidir qué filtrar en la ingesta es el verdadero riesgo de gobierno de datos, no guardar el dato crudo de más."
date: "2026-08-30"
newsletter: governance-chill
edicion: 1
---

Todos le tenemos algo de miedo a la capa Bronce. Suena a lo que es: crudo, sin procesar, "sucio" en el sentido más literal de la palabra. Y frente a algo que suena sucio, el reflejo natural de cualquier equipo de datos es limpiarlo cuanto antes — filtrar campos irrelevantes, descartar lo que "no se va a usar", dejar entrar solo lo necesario desde el primer momento en que el dato toca el lakehouse.

Ese reflejo, casi siempre bien intencionado, es exactamente la decisión que no hay que tomar en la ingesta.

## Por qué Bronce existe para capturar, no para decidir

La capa Bronce (Raw) tiene una función precisa dentro de una arquitectura de datos por capas: guardar el dato tal cual llega, sin transformar. No es un descuido ni un paso provisional que "ya se limpiará después" — es una decisión deliberada de gobierno de datos, y la razón es simple: en el momento de la ingesta casi nunca tienes suficiente contexto para saber qué vas a necesitar más adelante.

Decidir qué campo es relevante, qué registro se puede descartar, qué transformación aplicar — todo eso requiere contexto de negocio que normalmente no existe todavía en la ingesta. Existe más adelante, cuando alguien con la pregunta de negocio correcta se sienta frente al dato completo. Adelantar esa decisión a la ingesta no es eficiencia, es apostar que hoy sabes lo que vas a necesitar dentro de seis meses.

## El caso que lo deja claro: cuando la fuente no te da opción de arrepentirte

En un proyecto real de integración de datos, una de las fuentes era un sistema externo cuya API no permitía filtrar por campo ni por registro individual. La única forma de consumirla era pedir el bloque completo — todos los registros, todos los campos — en cada llamada, sin posibilidad de pedir un subconjunto.

El equipo discutió si convenía preseleccionar o limpiar campos desde la ingesta misma, para no cargar información de más al lakehouse. Era la conversación esperable: nadie quiere una capa Bronce inflada de datos que "probablemente" no sirven.

La conclusión fue la contraria a la intuición inicial. Como la fuente no garantizaba que se pudiera filtrar sin perder algo, cualquier intento de decidir "esto sí, esto no" en la ingesta arriesgaba descartar información que después resultara necesaria — y sin forma de recuperarla, porque la fuente no permitía volver a pedir solo esa parte. La decisión correcta fue llevar todo tal cual a Bronce, en ingesta batch completa, sin transformar, y trasladar todo el filtrado, tipado y modelado a las capas siguientes (Silver/Gold), donde ya se tiene el contexto suficiente para decidir bien.

## La regla que queda, y cómo se vuelve gobernable

De ahí sale una regla simple de aplicar en cualquier proyecto de integración: **si la fuente no te garantiza que puedes filtrar sin perder algo, no decidas en la ingesta.** Decide en la capa donde ya puedes ver el dato completo, con el contexto de negocio que la ingesta nunca tiene.

Esto es "Governance as Code" aplicado a arquitectura, no solo a políticas: la decisión de qué se filtra, cuándo y por qué, se convierte en una regla versionada y ejecutable en la capa correcta del pipeline — no en un criterio informal que alguien aplicó "a ojo" el día que escribió el job de ingesta, y que nadie puede auditar seis meses después cuando falta un campo. Una arquitectura de datos que no puede explicar por qué se descartó algo en la ingesta no es una arquitectura gobernada, es una apuesta que salió bien hasta que dejó de salir bien.

Si tu organización todavía está discutiendo dónde filtrar y dónde no —o peor, si nadie recuerda por qué se decidió filtrar donde se filtró— vale la pena mapear esas decisiones contra un marco explícito en vez de dejarlas a criterio individual. En Govia usamos el Trust Architecture Framework precisamente para esto: hacer visible y auditable el punto exacto del pipeline donde cada decisión de gobierno se toma, en vez de dejarla enterrada en el código de un job de ingesta que nadie vuelve a mirar. Puedes revisarlo en [/trust-architecture-framework](/trust-architecture-framework).

*Si esto te resuena, sígueme en LinkedIn para la próxima edición de Governance & Chill — o cuéntame ahí tu propio caso de capa Bronce → https://www.linkedin.com/pulse/episodio-1-el-mito-de-que-bronce-es-la-capa-sucia-edgar-pazos-rmfze/.*
