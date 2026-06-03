# Kafka — Hoja de referencia (1 página)

## Flujo mínimo

```
Productor → Topic → Partición (0, 1, 2…) → Consumer group → Offset
```

## Conceptos

| Concepto | En una frase |
|---------|----------------|
| **Topic** | Nombre del canal de mensajes (log). |
| **Partición** | Trozo del topic; el **orden** solo existe **dentro** de cada partición. |
| **Key** | Opcional; misma key → misma partición (misma entidad, mismo orden). |
| **Consumer group** | Varios consumidores que **se reparten particiones**; cada partición la lee **uno** del group. |
| **Offset** | Número de posición en la partición. |
| **Registrar offset** | Anotar en Kafka hasta dónde leyó el group (para continuar tras un reinicio). |
| **Lag** | Mensajes publicados que el group aún no ha leído. |
| **Líder** | Broker que atiende lecturas/escrituras de esa partición. |

## Regla práctica

- Topic con **N** particiones y **M** consumidores en **un** group → cada consumidor tiene como máximo **ceil(N/M)** particiones (reparto equilibrado).
- **Dos groups** en el mismo topic → cada group lee **todo** el topic por su cuenta (offsets distintos).

## Comandos útiles (`kafka-demo`)

```bash
make topic-describe
make group-all
make console-producer
make console-consumer
```

## No confundir

- **Broker** (Kafka) ≠ **Pod** (Kubernetes).
- **Key** ≠ id del mensaje; la key elige **partición**.
