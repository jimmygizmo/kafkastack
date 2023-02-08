import { Kafka } from "kafkajs";

// The .js extension is required on the following imports:
import * as Config from "./config.js";

const sendDelayMs = 3000;
const clientId = "consumerBasic";
console.log("======== consumerBasic.js has kafka address: " + Config.kafkaAddress);
const brokers = [Config.kafkaAddress];
const theTopics = ["topic-one"];
const kafkaClient = new Kafka({ clientId, brokers });
const consumer = kafkaClient.consumer({ groupId: clientId });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe(
    {
      topics: theTopics
    }
  );
  await consumer.run({
      eachMessage: (
        { message} ) => { console.log(`Message received: ${message.value}`) },
    },
  );
};

export default runConsumer;

