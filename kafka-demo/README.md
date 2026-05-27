# Kafka Demo (Node + Python)

Este demo permite probar comportamientos de produccion y consumo en Kafka con perfiles separados para Node y Python.

## Arranque base del cluster

```bash
make format
make start
```

## Demos Node

```bash
make producers-node
make consumers-node
```

Servicios:

- `node-producer` (perfil `producer-node`)
- `node-consumer` (perfil `consumer-node`)

Codigo editable:

- `src/node/producer.js`
- `src/node/consumer.js`

## Demos Python

```bash
make producers-python
make consumers-python
```

Servicios:

- `py-producer` (perfil `producer-python`)
- `py-consumer` (perfil `consumer-python`)

Codigo editable:

- `src/python/producer.py`
- `src/python/consumer.py`

## Ejecutar todos los productores o consumidores

```bash
make producers
make consumers
```

## Variables utiles para demos

- `TOPIC`: topic a usar
- `INTERVAL_MS`: frecuencia de envio en productores
- `GROUP_ID`: grupo de consumidores
- `FROM_BEGINNING` (Node): `true|false`
- `AUTO_OFFSET_RESET` (Python): `earliest|latest`

Puedes cambiar estas variables en `docker-compose.yaml` o al ejecutar con `docker compose run -e ...`.
