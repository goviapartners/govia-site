---
title: "Episodio 2 – El cementerio de las políticas PDF"
description: "Por qué una política de datos puede estar aprobada, publicada y completamente muerta al mismo tiempo, y qué la hace revivir."
date: "2026-09-08"
image: "/blog-covers/cementerio-politicas-pdf.png"
newsletter: governance-chill
edicion: 2
---

En cualquier auditoría de gobierno de datos llega el mismo momento incómodo: alguien señala una política que lleva meses aprobada y pregunta "muéstrame dónde se aplica esto". Y ahí, casi siempre, se hace un silencio que dice más que cualquier respuesta.

## La política que está viva en el papel y muerta en la práctica

No es un problema de mala fe. Es un problema de diseño. Una política de calidad de datos suele nacer como documento: se redacta, se revisa con Legal o con el comité de gobierno, se aprueba en una reunión, se publica en la intranet corporativa. Cada uno de esos pasos es real y cada uno cuesta tiempo de gente senior. El problema es que ninguno de esos pasos hace que la política ocurra.

Un documento aprobado describe una intención. No ejecuta nada. Puede decir, con total claridad, que "todo campo de identificación personal debe estar enmascarado en ambientes de desarrollo" y, al mismo tiempo, convivir tranquilamente con una base de staging donde ese campo lleva meses sin enmascarar, porque nadie construyó el control que lo verificara. La política no miente. Simplemente nunca tocó el dato.

## Por qué el PDF nunca fue el problema

Es tentador culpar al formato: "el problema es que está en PDF, hay que pasarlo a un wiki, a un Notion, a algo más vivo". Ayuda, pero no resuelve nada de fondo. Un Notion sin control detrás es el mismo cadáver, solo que con mejor tipografía.

El problema real es que la política vive desconectada del lugar donde de verdad se toman las decisiones sobre el dato: el pipeline, el esquema, el job que corre cada noche. Mientras la política sea un artefacto que alguien tiene que recordar consultar, va a perder contra la urgencia del día a día. Nadie abre un documento de veinte páginas para decidir si puede lanzar un dashboard antes del comité de las tres. Decide con lo que tiene a la mano, y sigue.

## Lo que hace que una política sea ejecutable, no solo aprobada

Esto es exactamente lo que resuelve "Governance as Code": tratar la política de gobierno de datos con la misma disciplina que la ingeniería de software aplica al código fuente. No como una declaración de intenciones archivada, sino como un control versionado, verificable y ejecutable que corre contra el dato mismo.

En la práctica eso significa tres cosas concretas. Versionado: la regla vive en un repositorio, con historial de cambios y responsable claro, igual que cualquier otro artefacto técnico de la organización. Verificable: alguien puede correrla hoy mismo y obtener un resultado binario, cumple o no cumple, en vez de una interpretación subjetiva de un párrafo. Ejecutable: la regla corre automáticamente contra el dato real, en el pipeline o en el esquema, no en la cabeza de la persona que se acuerda de revisarla cada trimestre.

Cuando la política deja de ser un documento y pasa a ser una regla que corre, la pregunta del auditor deja de dar miedo. "Muéstrame dónde se aplica esto" se responde con un log, no con una explicación.

## De cuántas de tus políticas dependes sin saberlo

En Govia usamos el Trust Maturity Score para responder exactamente esta pregunta antes de que la haga un auditor externo: cuántos de los controles que tu organización cree tener activos son en realidad reglas ejecutándose contra el dato, y cuántos son documentos aprobados que nadie volvió a tocar. El resultado suele ser incómodo la primera vez, y es justo el punto de partida más honesto para priorizar qué convertir primero en código. Puedes revisarlo en [/trust-maturity-score](/trust-maturity-score).

*Si esto te resuena, sígueme en LinkedIn para la próxima edición de Governance & Chill, o cuéntame ahí cuántas políticas "vivas" tiene en realidad tu organización → https://www.linkedin.com/pulse/episodio-2-el-cementerio-de-las-pol%C3%ADticas-pdf-edgar-pazos-somme/.*
