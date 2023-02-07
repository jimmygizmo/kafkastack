import kafka, { KeyedMessage } from "kafka-node";

// The .js extension is required on the following imports:
import * as Config from "./config.js";


// https://www.sohamkamani.com/nodejs/working-with-kafka/

// https://www.npmjs.com/package/kafka-node

// https://www.tabnine.com/code/javascript/functions/kafka-node/KafkaClient


const Producer = kafka.Producer;
// Maybe we should not even declare this and just call: new kafka.KeyedMessage() down in sendOneBatch
const ClassKeyedMessage = kafka.KeyedMessage;
console.log("======== producerBasic.js has kafka address: " + Config.kafkaAddress)
const kafkaClient = new kafka.KafkaClient(
        {
            kafkaHost: Config.kafkaAddress
        }
    );
const kafkaProducer = new Producer(kafkaClient);

// Configuring payloads. An array of these payload objects. Details and an example of one:
//   messages - An array of messages and/or KeyedMessage objects. Just one works as well.
//   key - string or buffer, only needed when using keyed partitioner.
//   partition and attributes both default to 0. timestamp defaults to Date.now() in kafka v0.10+

const payloads__detailed_example = [
    {
        topic: "topicName",
        messages: ["message body"],
        key: "theKey",
        partition: 0,
        attributes: 2,
        timestamp: Date.now(),
    },
];

// ======== Send a one-off. ========

const payloadsOneOff = [
    { topic: "oneofftopic", messages: `message: ONE-OFF` },
];

// TEST RESULT: kP-on-ready--send--cb called with data = undefined.
// (Producer ready event did come before this.)
// A consumer, launched a bit late, never saw this message. Consumer:
// docker-compose exec -it kafkapoc-kafka bash
// /opt/kafka/bin/kafka-console-consumer.sh --topic oneofftopic --from-beginning --bootstrap-server localhost:9092
// Same result with hostname "kafkapoc-kafka" instead of localhost. We've had success connecting these before.
// The problem seems I am not doing "kafka" correctly yet in this test.
// We're right there and I'm sure the problem is a trivial detail.


kafkaProducer.on("ready", () => {
        console.log("======== Producer ready event (oneoff).");
        kafkaProducer.send(
            payloadsOneOff,
            (error, data) => { console.log("kP-on-ready--send--cb: " + data) }
        );
    }
);

kafkaProducer.on("error", (error) => {
    console.log("kP-on-error--cb: " + error);
    }
);


// ======== Prepare "payloads" with some messages. Send them. Log result. Log error. ========

const sendOneBatch = (uniqueString) => {
    // const oneKeyedMessage = new ClassKeyedMessage("onekey", `message: ${uniqueString}`);

    // topic1 has one message on partition 0. topic2 has 3 messages and one is a KeyedMessage.
    // const payloads = [
    //     { topic: "topic1", messages: "hi", partition: 0 },
    //     { topic: "topic2", messages: ["hello", "world", oneKeyedMessage] },
    // ];
    const payloads = [
        { topic: "onetopic", messages: `message: oneOff` },
    ];

    kafkaProducer.on("ready", () => {
            console.log("======== Producer ready event.");
            kafkaProducer.send(
                payloads,
                (error, data) => { console.log("kP-on-ready--send--cb: " + data) }
            );
        }
    );

    kafkaProducer.on("error", (error) => {
        console.log("kP-on-error--cb: " + error);
        }
    );
};  // sendOneBatch


// ======== Repeat ========

let sendCounter = 1;
const sendCountMax = 200;
const timeoutMs = 3000;

function sendLoop() {
  setTimeout(() => {
    console.log("Send iteration: " + sendCounter);
    sendOneBatch(`Producer Batch: ${sendCounter}`);
    sendCounter++;
    if (sendCounter < sendCountMax) {
      sendLoop();
    }
  }, timeoutMs)
}

// Disable the loop for now. Testing the one-off above.
// sendLoop();

