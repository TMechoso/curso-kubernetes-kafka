# Guion docente — Recuperación 2 h

Frases listas para impartir. Ajustar tiempos si el grupo va más lento.

---

## 0:00 — Apertura

> «Esta sesión no es examen. Vamos a cerrar cuatro ideas de Kafka que en la encuesta salieron flojas: **quién lee qué partición**, **la key**, **el offset** y un vistazo al **lag**. Kubernetes lo damos por visto del Bloque 1.»

---

## 0:08 — Pizarra

Dibujar:

```
[Productor] → Topic "recuperacion" → |P0|P1|P2| → [Group rec-g1: C1 C2] → offsets
```

> «**Topic** es el nombre. **Partición** es cada trozo del log. El **grupo** reparte particiones entre consumidores. El **offset** es el marcador en cada trozo.»

---

## 0:20 — Consumer group (núcleo)

Antes de terminal:

> «Si tengo **6 particiones** y **3 consumidores en el mismo group**, lo normal es **2 particiones por consumidor**. No 1. No 6.»

En terminal: dos consumidores, **mismo** `group`.

```bash
make group-all
```

> «¿Veis la columna de partición asignada a cada consumidor? **Una partición la lee solo un miembro del group.**»

Si alguien dice Pods:

> «Los Pods son de Kubernetes. El **consumer group** es solo de Kafka: son programas que leen mensajes.»

---

## 0:45 — Dos groups

> «Dos groups en el mismo topic = **dos lecturas independientes** del flujo. Cada uno con su offset.»

---

## 1:10 — Key

> «La **key** no es el id del mensaje. Sirve para que todo lo de `cliente-A` vaya a la **misma partición** y mantenga orden.»

Demo: 5 mensajes con key fija, 5 sin key.

---

## 1:25 — Offset

> «**Offset** = posición en la partición. **Registrar** (commit) = decirle a Kafka: ya procesé hasta aquí. Si reinicio el consumidor con el mismo group, sigue desde ahí.»

Parar consumidor → `group-all` → arrancar otra vez.

---

## 1:45 — Lag (opcional)

> «**Lag** = cuántos mensajes te quedan por leer respecto a lo último publicado.»

---

## 1:55 — Cierre

Entregar hoja-resumen. Pregunta:

> «Levantad la mano si **consumer group** sigue flojo. Si **offset**. Si **key**.»

Eso ordena la siguiente sesión normal.
