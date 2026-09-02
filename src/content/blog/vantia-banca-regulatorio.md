---
title: "Day 1: La banca no tiene un problema de trazabilidad, tiene un problema de autoridad"
description: "Un banco recibe una observación regulatoria, compra una herramienta de linaje de datos, y descubre que el problema real era de autoridad, no de trazabilidad."
date: "2026-09-01"
image: "/blog-covers/vantia-banca-regulatorio.png"
newsletter: dmbok-stories
edicion: 1
---

Vantia, el banco comercial que protagoniza esta bitácora, acababa de descubrir frente al regulador que su nueva herramienta de linaje mapeaba el dato a la perfección, pero nadie en la organización tenía autoridad formal para declarar ese dato confiable. Esto fue lo que hicieron con ese hallazgo.

## Nombrar quién decide

Lo primero que resolvió Vantia no fue técnico. Fue nombrar a un data owner de negocio para el dominio de datos de riesgo: alguien dentro de Riesgos, no un administrador de sistemas ni un arquitecto de datos, con autoridad formal sobre la definición y la calidad de esos datos. El DAMA-DMBOK2 es explícito en esto, dentro de su dominio de Data Governance (capítulo 3): el data owner es un rol de negocio, no un rol técnico, y su autoridad viene de la organización, no del sistema donde vive el dato.

## Separar qué decide cada quien

El segundo paso fue más incómodo que el primero: documentar por escrito qué decisiones le correspondían a ese owner (la definición del dato, el criterio de calidad, quién podía acceder a él) y cuáles seguían siendo decisión de Tecnología (dónde se almacenaba, con qué arquitectura, con qué herramienta se rastreaba). Sin esa línea explícita, Riesgos y Tecnología llevaban meses resolviendo cada desacuerdo caso por caso, por correo, sin ningún criterio consistente de por medio.

## Definir "confiable" antes de auditar

El tercer paso fue documentar, junto con el nuevo data owner, el criterio de "dato confiable" para el dominio de riesgo: qué reconciliaciones tenía que pasar una cifra, con qué frecuencia, y quién firmaba esa validación. Solo después de tener ese criterio por escrito, Vantia volvió a auditar la cifra que había motivado la observación original. Antes de eso, cualquier auditoría hubiera sido comparar el dato contra un estándar que nadie había definido todavía.

La herramienta de linaje que ya habían comprado no se desechó. Simplemente pasó a ocupar el lugar que le correspondía desde el inicio: la última pieza del proceso, no la primera. Documenta el camino del dato una vez que alguien ya tiene autoridad para decir qué debía encontrar ese camino.

Si tu organización está en el punto en el que estaba Vantia (presión regulatoria sobre trazabilidad, y todavía sin claridad sobre quién decide qué dato es confiable), vale la pena mapear ese marco de autoridad antes de evaluar cualquier herramienta nueva. En Govia usamos el Trust Architecture Framework precisamente para esto: hacer explícito quién decide, sobre qué datos y con qué criterio, antes de que la conversación se desvíe hacia qué software comprar. Puedes revisarlo en [/trust-architecture-framework](/trust-architecture-framework).

*Si sigues "DMBOK Stories" en LinkedIn, sígueme ahí o cuéntame tu propio caso de gobierno de datos → https://www.linkedin.com/pulse/day-1-la-banca-tiene-un-problema-de-trazabilidad-autoridad-pazos-08ybe/.*

La siguiente entrega sigue con Vantia: los data owners ya tienen nombre, pero cuando Riesgos y Tecnología no se ponen de acuerdo sobre quién tiene la última palabra en una disputa, alguien todavía tiene que decidir quién decide eso.
