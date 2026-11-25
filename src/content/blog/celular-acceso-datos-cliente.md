---
title: "Episodio 5 – ¿Tu celular ya tiene acceso a los datos de tu cliente?"
description: "Genie One Mobile de Databricks hereda los controles de red del navegador, pero no una decisión explícita sobre qué dispositivos deberían acceder."
date: "2026-11-24"
newsletter: governance-chill
edicion: 5
image: "/blog-covers/celular-acceso-datos-cliente.png"
---

Databricks anunció hace poco Genie One Mobile: la versión nativa para iOS y Android de su asistente conversacional, que te deja preguntarle a los datos de tu empresa en lenguaje natural desde el celular, sin abrir el navegador. Está en Public Preview y viene habilitada por defecto para todas las cuentas: un administrador de cuenta tiene que entrar a apagarla si no la quiere, no al revés.

Como consultor externo, la pregunta que me salió fue más simple y más incómoda: si instalo esa app en mi celular personal, ¿tengo acceso a los datos de mi cliente desde ahí? ¿Mi equipo, sin gestión de la empresa, sin que nadie de TI del cliente sepa siquiera que existe, se vuelve de un día para otro un punto de entrada a su workspace?

La parte tranquilizadora, verificada directo en la documentación de Databricks: la app móvil se conecta a la misma cuenta y a las mismas URLs de workspace que el navegador. Si tu cliente ya tiene controles de red (lista de IPs permitidas, VPN, Private Link), esos controles siguen aplicando igual desde el celular. No es una puerta trasera que salta el perímetro.

## El perímetro de red nunca fue la pregunta completa

Lo que cambia con una app nativa habilitada por defecto es que aparece una variable que antes casi no entraba a la conversación: el dispositivo.

Un dato clasificado como sensible no deja de serlo porque lo estés viendo desde el celular en vez de la laptop. Pero las preguntas de seguridad que ya le haces de forma rutinaria a una laptop corporativa (¿tiene cifrado de disco? ¿bloqueo con PIN o biometría? ¿se puede borrar remotamente si se pierde? ¿quién responde si cae en las manos equivocadas?) probablemente nunca te las hiciste a tu celular personal, porque nunca habías tenido una app que te dejara simplemente preguntarle algo a un dashboard de producción y recibir la respuesta ahí mismo.

Para un consultor externo esto es todavía más directo. El contrato o el NDA que firmaste probablemente diga que no vas a compartir la información del cliente. ¿Dice también desde qué tipo de dispositivo puedes consultarla? Y para alguien que trabaja directamente en la empresa, la pregunta es la misma vista al revés: ¿te dan un equipo gestionado para esto, o la empresa está confiando en que uses el tuyo con buen criterio, sin habérselo pedido explícitamente?

## Decidirlo a propósito, no heredarlo por default

Nada de esto significa que haya que prohibir Genie Mobile ni ninguna app parecida. Significa aplicarle al dispositivo la misma regla que ya aplicas a cualquier dato sensible: alguien tiene que decidir, a propósito, quién puede acceder y desde qué tipo de equipo, en vez de heredar la respuesta por default solo porque la función vino activada así.

Ese tipo de riesgo (acceso a datos sensibles desde dispositivos personales sin gestión) es exactamente el tipo de cosa que debería vivir en un registro de riesgos de datos con responsables y plazos asignados, y en un proceso formal de incidentes de seguridad que pueda activarse si algo sale mal. El Trust Maturity Score pregunta, en el pilar Escudo de Cumplimiento, si esos dos mecanismos existen formalmente en tu organización: no mide el acceso móvil en sí, pero sí si tienes la gobernanza base para manejar un riesgo como este cuando aparece. Puedes revisar en qué nivel está el tuyo en [/trust-maturity-score](/trust-maturity-score).

*Si alguna vez te preguntaste (o te preguntaron) si tu propio celular debería tener acceso a los datos de un cliente, sígueme en LinkedIn para la próxima edición de Governance & Chill, o cuéntame cómo lo resolvieron en tu caso → https://www.linkedin.com/pulse/episodio-5-tu-celular-ya-tiene-acceso-los-datos-de-cliente-pazos-qbave/.*
