# Plan de recuperación — 2 horas

Basado en `analisis-resultados.md` (n = 6). Objetivo: que el perfil desorientado pueda **narrar y ver** productor → topic → particiones → consumer group → offset.

**Prerrequisito:** cluster `kafka-demo` ya en marcha; topic `recuperacion` con **3 particiones**, RF 3.

---

## Prioridades (orden)

1. Consumer group ↔ reparto de **particiones** (fallo 5/6 en escenario)
2. **Offset** (registrar lectura por partición)
3. **Key** → misma partición
4. **Lag** (solo visual, 2 min)
5. Consola + `group-all` (demo más pedida)

---

## Cronograma

| Tiempo | Bloque | Contenido |
|--------|--------|-----------|
| 0:00–0:08 | Mapa | Topic → Particiones → Group → Offset |
| 0:08–0:20 | Setup | `topic-create`, `topic-describe` (3 particiones) |
| 0:20–0:45 | **Consumer group** | 2 consumidores mismo group; `group-all`; ejercicio 6p+3c=2 máx |
| 0:45–1:00 | Dos groups | Mismo topic, groups distintos (refuerzo 6/6 aciertos) |
| 1:00–1:10 | Pausa | |
| 1:10–1:25 | **Key** | Misma key vs sin key |
| 1:25–1:45 | **Offset** | Parar consumidor; `group-all`; reiniciar mismo group |
| 1:45–1:55 | Lag | Productor rápido + consumidor parado (opcional) |
| 1:55–2:00 | Cierre | Hoja-resumen + votación «qué sigue flojo» |

---

## Comandos de referencia

```bash
cd kafka-demo
make topic-create      # recuperacion, 3, 3
make topic-describe
make producers-node    # o console-producer
make consumers-node    # dos terminales, mismo GROUP_ID en compose o consola
make group-all
```

**No en vivo en 2 h:** `*-scale` (dejar para práctica asistida posterior).

---

## Mensajes clave (lenguaje clase)

- **Consumer group** = clientes Kafka que se reparten **particiones** (no Pods de Kubernetes).
- **Key** = elige **partición**; misma entidad → misma partición → orden.
- **Offset** = marcador por partición; **registrar** = anotar hasta dónde leyó el group.
- **Lag** = retraso entre publicado y leído.

---

## Distribución en sala

| Rol | En 2 h |
|-----|--------|
| Perfil fuerte | Tutor en pareja durante `group-all` |
| Perfil desorientado | Foco en bloques 0:20–0:45 y 1:25–1:45 |
| Instructor | Pizarra escenario 6 particiones / 3 consumidores antes de terminal |

---

## Material a entregar

- [`hoja-resumen-alumno.md`](hoja-resumen-alumno.md) (imprimir o PDF)
