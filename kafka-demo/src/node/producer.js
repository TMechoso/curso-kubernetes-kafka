const { Kafka } = require("kafkajs");

const brokers = (process.env.BROKERS || "broker1:9092")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const topic = process.env.TOPIC || "demo-node";
const clientId = process.env.CLIENT_ID || "node-producer";
const intervalMs = Number(process.env.INTERVAL_MS || "1000");

const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

let seq = 0;

async function main() {
  await producer.connect();
  console.log(`[node-producer] connected brokers=${brokers.join(",")} topic=${topic}`);

  setInterval(async () => {
    seq += 1;
    const payload = {
      seq,
      source: "node",
      producedAt: new Date().toISOString(),
    };
    try {
      await producer.send({
        topic,
        messages: [{ key: `node-${seq}`, value: JSON.stringify(payload) }],
      });
      console.log(`[node-producer] sent seq=${seq}`);
    } catch (error) {
      console.error("[node-producer] send failed", error.message);
    }
  }, intervalMs);
}

process.on("SIGINT", async () => {
  await producer.disconnect();
  process.exit(0);
});

main().catch((error) => {
  console.error("[node-producer] fatal error", error);
  process.exit(1);
});