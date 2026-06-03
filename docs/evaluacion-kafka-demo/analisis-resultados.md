# Análisis de resultados — Autoevaluación K8s + Kafka

**Fuente:** `datos/respuestas-formulario-1.csv`  
**Respuestas:** n = 6 (3 junio 2026)

---

## Resumen ejecutivo

| Indicador | Lectura |
|-----------|---------|
| Experiencia Kafka | 4/6 sin uso previo de Kafka |
| Experiencia K8s | Variable; varios con despliegue previo o Labs sin dificultad |
| Ritmo | 4/6 indica **rápido** (4) o **bien** (3) |
| Confianza Kafka (1–5) | Media ~2,5; máximo 4, mínimo 2 |
| Confianza K8s (1–5) | Muy dispersa (1–5) |

**Conclusión:** el cuello de botella es **Kafka (consumer groups, particiones, offset)**, no repetir el Bloque 1 de Kubernetes.

---

## Escenarios (comprensión real)

| Pregunta | Respuesta correcta | Aciertos |
|----------|-------------------|:--------:|
| 6 particiones, group de 3 consumidores → máx. particiones por consumidor | **2** | **1/6** |
| Dos consumer groups en el mismo topic | Cada grupo recibe todo el flujo | 6/6 |
| Misma key `cliente-42` siempre | Misma partición | 5/6 |
| Caída broker RF=3, ISR sano | Otro líder, cluster sigue | 6/6 |

El **83% de error** en reparto de particiones define la prioridad didáctica.

---

## Autoevaluación por concepto (Kafka)

Tendencia agregada (Mucho / Algo / Poco / Nada):

| Concepto | Débil (Poco+Nada) | Fuerte (Mucho+Algo) |
|----------|-------------------|---------------------|
| Topic | Minoría | Mayoría |
| Partición | ~50% Poco o confusión en frases | Algo dominante |
| Key | Mayoría Poco | Pocos claros |
| Consumer group | Casi todo Algo; 1 mezcla con Pods K8s | — |
| Offset | Algo con definiciones imprecisas | — |
| Lag | 2 Nada, varios Poco | — |
| Replicación / ISR | Varios Poco/Nada en texto | Escenario fallo OK |
| Líder | Algo/Poco | — |

---

## Demos kafka-demo — dónde más se perdieron

Frecuencia en casillas «más perdido»:

- Escalar productores/consumidores (`*-scale`)
- Consola Kafka (`console-producer` / `console-consumer`)
- Diagnóstico (`topic-describe`, `group-all`, lag)
- Productor/consumidor Python
- Crear topics / arrancar cluster (algunos)

Varios pidieron repetir **diagnóstico** o **consola**.

---

## Peticiones explícitas (texto libre y 30 min extra)

- **Offsets, lag y commits** — mencionado varias veces
- **Consumer groups y rebalanceo**
- **Hoja-resumen** y **vídeo corto** de repaso
- **Más demo guiada** y **practicar juntos** (no solo demostración del profesor)
- **Conceptos Kafka antes que demos** (un respondiente con buen nivel K8s)

---

## Perfil «más desorientado» (referencia para recuperación)

Combina patrones de respuestas con:

- Experiencia nula o muy baja en Kafka
- Consumer group explicado incorrectamente (p. ej. confundido con Pods)
- Escenario 6p + 3 consumidores respondido **1** en lugar de **2**
- Offset/lag sin definición operativa
- Demos: scale, consola, diagnóstico
- Seguimiento «más perdido que seguido» en Kafka

## Perfil «referencia fuerte» (tutor en parejas)

- K8s sólido, cómodo en demos
- Escenarios Kafka casi todos correctos
- Puede apoyar a compañeros en `group-all` y consola

---

## Qué no priorizar en recuperación

- Confluent, Schema Registry, Connect
- KRaft / CAP en profundidad
- Repaso largo de K8s (salvo aclaración «broker ≠ pod», 2 min)

---

## Acciones en sesiones normales (fuera de las 2 h)

| Feedback | Acción |
|----------|--------|
| Practicar juntos | Más live coding conjunto, menos solo demo del profesor |
| Sin tiempo para repaso | Enviar `hoja-resumen-alumno.md` + checklist pre-lab |
| Instalación | Enlace a `kafka-demo` README / Lab 0 |
| Diagnóstico de fallos | Slot corto en sesión siguiente |
