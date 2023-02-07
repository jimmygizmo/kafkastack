import kafka from "kafka-node";


// The .js extension is required on the following imports:
import * as Config from "./config.js";


const client = new kafka.KafkaClient(
        {
            kafkaHost: Config.kafkaAddress
        }
    );

