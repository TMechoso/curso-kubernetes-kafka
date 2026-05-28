const { Kafka } = require("kafkajs");

const brokers = (process.env.BROKERS || "broker1:9092")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const topic = process.env.TOPIC || "demo-node";
const clientId = process.env.CLIENT_ID || "node-consumer";
const groupId = process.env.GROUP_ID || "demo-node-group";
const fromBeginning = (process.env.FROM_BEGINNING || "true").toLowerCase() === "true";

const kafka = new Kafka({ clientId, brokers });
const consumer = kafka.consumer({ groupId });

async function main() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning });
  console.log(
    `[node-consumer] connected brokers=${brokers.join(",")} topic=${topic} group=${groupId} fromBeginning=${fromBeginning}`
  );

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      const key = message.key ? message.key.toString() : "null";
      const value = message.value ? message.value.toString() : "null";
      console.log(`[node-consumer] partition=${partition} offset=${message.offset} key=${key} value=${value}`);
      console.log(JSON.parse(value))
      await haceAlgo(JSON.parse(value))
    },
  });
}

async function haceAlgo({seq}){
  console.log('Acabo de hacer una accion con el seq: ' + seq)
}


process.on("SIGINT", async () => {
  await consumer.disconnect();
  process.exit(0);
});

main().catch((error) => {
  console.error("[node-consumer] fatal error", error);
  process.exit(1);
});
