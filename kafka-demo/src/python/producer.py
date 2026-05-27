import json
import os
import time
from datetime import datetime, timezone

from kafka import KafkaProducer


bootstrap_servers = [
    broker.strip()
    for broker in os.getenv("BOOTSTRAP_SERVERS", "broker1:9092").split(",")
    if broker.strip()
]
topic = os.getenv("TOPIC", "demo-python")
client_id = os.getenv("CLIENT_ID", "py-producer")
interval_ms = int(os.getenv("INTERVAL_MS", "1000"))

producer = KafkaProducer(
    bootstrap_servers=bootstrap_servers,
    client_id=client_id,
    value_serializer=lambda value: json.dumps(value).encode("utf-8"),
    key_serializer=lambda key: key.encode("utf-8"),
)

print(f"[py-producer] connected brokers={','.join(bootstrap_servers)} topic={topic}")

seq = 0
while True:
    seq += 1
    payload = {
        "seq": seq,
        "source": "python",
        "producedAt": datetime.now(timezone.utc).isoformat(),
    }
    try:
        producer.send(topic, key=f"py-{seq}", value=payload)
        producer.flush()
        print(f"[py-producer] sent seq={seq}")
    except Exception as exc:
        print(f"[py-producer] send failed: {exc}")
    time.sleep(interval_ms / 1000.0)
