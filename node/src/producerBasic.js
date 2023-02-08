import { Kafka } from "kafkajs";

// The .js extension is required on the following imports:
import * as Config from "./config.js";

// UPDATE: We might be changing our client lib to a native JS one and possibly
// the new preferred choice. UPDATE: Changed.
// https://www.linkedin.com/pulse/kafka-client-library-comparison-rob-golder/

// https://www.sohamkamani.com/nodejs/working-with-kafka/

// https://www.npmjs.com/package/kafka-node

// https://www.tabnine.com/code/javascript/functions/kafka-node/KafkaClient

const sendDelayMs = 3000;
const clientId = "producerBasic";
console.log("======== producerBasic.js has kafka address: " + Config.kafkaAddress);
const brokers = [Config.kafkaAddress];
const topicOne = "topic-one";
const kafkaClient = new Kafka({ clientId, brokers });
const producer = kafkaClient.producer();

const runProducer = async () => {
	await producer.connect();
	let messageCount = 0;

	setInterval(async () => {
		try {
			await producer.send({
					topicOne,
					messages: [
						{
							key: String(messageCount),
							value: "Unique message: " + messageCount,
						},
					],
				},
			);

			console.log("Message successfully written: ", messageCount);
			messageCount++;
		} catch (err) {
			console.error("ERROR: Message write failure: " + err);
		}
	}, sendDelayMs);
};

export default runProducer;

