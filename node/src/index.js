import runProducer from "./producerBasic.js";
import runConsumer from "./consumerBasic.js";


runProducer().catch(
  (err) => { console.error("ERROR: Producer: ", err) }
);


runConsumer().catch(
  (err) => { console.error("ERROR: Consumer: ", err) }
);

