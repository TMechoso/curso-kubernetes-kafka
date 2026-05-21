bootstrap-server = broker1:9092


format:
	docker compose --profile format up 
start:
	docker compose --profile cluster up


client:	
	docker compose --profile client up -d


client-connect:
	docker exec -it kafka-demo-client-1 bash

topic-create:	
	@read -p "Enter a topic name: " topic; \
	read -p "Enter partition number: " partitions; \
	read -p "Enter replication factor: " replication; \
	docker compose run --rm client bash -c \
		"./opt/kafka/bin/kafka-topics.sh --create --bootstrap-server $(bootstrap-server) --topic $$topic --partitions $$partitions --replication-factor $$replication"


topic-list:
	docker compose run --rm client bash -c \
		"./opt/kafka/bin/kafka-topics.sh --list --bootstrap-server $(bootstrap-server)"

topic-describe:
	@read -p "Enter a topic name: " topic; \
	docker compose run --rm client bash -c \
		"./opt/kafka/bin/kafka-topics.sh --describe --bootstrap-server $(bootstrap-server) --topic $$topic"

console-producer:
	@read -p "Enter a topic name: " topic; \
	docker compose run --rm client bash -c \
		"./opt/kafka/bin/kafka-console-producer.sh --bootstrap-server $(bootstrap-server) --topic $$topic"	

console-consumer:
	@read -p "Enter a topic name: " topic; \
	read -p "Enter a group name: " group; \
	docker compose run --rm client bash -c \
		"./opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server $(bootstrap-server) --topic $$topic --group $$group"	