import os

from kafka import KafkaConsumer


bootstrap_servers = [
    broker.strip()
    for broker in os.getenv("BOOTSTRAP_SERVERS", "broker1:9092").split(",")
    if broker.strip()
]
topic = os.getenv("TOPIC", "demo-python")
group_id = os.getenv("GROUP_ID", "demo-python-group")
client_id = os.getenv("CLIENT_ID", "py-consumer")
auto_offset_reset = os.getenv("AUTO_OFFSET_RESET", "earliest")

consumer = KafkaConsumer(
    topic,
    bootstrap_servers=bootstrap_servers,
    client_id=client_id,
    group_id=group_id,
    auto_offset_reset=auto_offset_reset,
    enable_auto_commit=True,
)

print(
    f"[py-consumer] connected brokers={','.join(bootstrap_servers)} topic={topic} group={group_id} auto_offset_reset={auto_offset_reset}"
)

for message in consumer:
    key = message.key.decode("utf-8") if message.key else "null"
    value = message.value.decode("utf-8") if message.value else "null"
    print(
        f"[py-consumer] partition={message.partition} offset={message.offset} key={key} value={value}"
    )
