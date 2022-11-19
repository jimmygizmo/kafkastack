#! /usr/bin/env python

from kafka import KafkaProducer
import json


def publish_message(kf_producer, topic_name, key, value):
    try:
        # Getting non-fatal error or warning here possibly: "encoding without a string argument"
        print(f"{ type( key ) } : { type( value ) }")
        print(f"{ key } : { value }")
        # key is an int and value is a string (which so happens to contain a json object)
        # Therefore it must be key that is the problem. (Error is not specific and has no stack trace.)
        # Error actually appears to be fatal. I did not realize we were inside a try until now.
        # key_bytes = bytes(key, encoding="utf-8")
        # value_bytes = bytes(value, encoding="utf-8")
        # Solution: Force string on key.:
        key_bytes = bytes(str(key), encoding="utf-8")
        value_bytes = bytes(value, encoding="utf-8")
        kf_producer.send(topic_name, key=key_bytes, value=value_bytes)
        kf_producer.flush()
        print("Message published successfully.")
    except Exception as ex:
        print(str(ex))


if __name__ == "__main__":
    kafka_producer = KafkaProducer(
        bootstrap_servers=["localhost:9092"],
        api_version=(0, 10)
    )

    employees = [
        {
            "name": "John Smith",
            "id": 1
        }, {
            "name": "Susan Doe",
            "id": 2
        }, {
            "name": "Karen Rock",
            "id": 3
        },
    ]

    for employee in employees:
        publish_message(
            kf_producer=kafka_producer,
            topic_name="employees",
            key=employee["id"],
            value=json.dumps(employee)
        )

    if kafka_producer is not None:
        kafka_producer.close()

