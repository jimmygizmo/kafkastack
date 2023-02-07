import dotenv from "dotenv";


const dotenvLoadResult = dotenv.config();
console.log("**** KAFKA CLIENT/SERVICE CONFIG - Attempt to load and process .env file for configuration returned the following:");
console.log(dotenvLoadResult);
console.log("**** KAFKA CLIENT/SERVICE CONFIG - Current process.env after container startup and .env file load attempt:");
console.log(process.env);
// NOTE: Even if no .env file with valid entries is successfully processed, there will still be a handful of
// process.env entries showing which were set by the base image, docker or some other factor.


// APOLLO ------------------------------------------------------------------------------------

const KFKC_SERVICE_PORT_DEFAULT="44555";
export const kfkcServicePort = process.env.KFKC_SERVICE_PORT ||  KFKC_SERVICE_PORT_DEFAULT;


// MONGODB -----------------------------------------------------------------------------------

const KAFKA_SERVICE_HOST_DEFAULT = "kafkapoc-kafka";
const KAFKA_SERVICE_PORT_DEFAULT = 9092;
const KAFKA_SERVICE_DBNAME_DEFAULT = "kafkabrokername";
const KAFKA_SERVICE_USER_DEFAULT = "kafkauser";
const KAFKA_SERVICE_PASS_DEFAULT = "kafkapass";
const kafkaHost = process.env.KAFKA_SERVICE_HOST || KAFKA_SERVICE_HOST_DEFAULT;
const kafkaPort = process.env.KAFKA_SERVICE_PORT || KAFKA_SERVICE_PORT_DEFAULT;
const kafkaDbName = process.env.KAFKA_SERVICE_DBNAME || KAFKA_SERVICE_DBNAME_DEFAULT;
const kafkaUser = process.env.KAFKA_SERVICE_USER || KAFKA_SERVICE_USER_DEFAULT;
const kafkaPass = process.env.KAFKA_SERVICE_PASS || KAFKA_SERVICE_PASS_DEFAULT;

// TODO: This config code came from a MongoDB app. Only the names were made to match
//   Kafka. It needs to be adapted to create proper Kafka login and address information.
// export const kafkaUrl =
//   "mongodb://" +
//   kafkaUser + ":" + kafkaPass + "@" +
//   kafkaHost + ":" + kafkaPort + "/" + kafkaBrokerName;
export const kafkaAddress =
  kafkaHost + ":" + kafkaPort;

