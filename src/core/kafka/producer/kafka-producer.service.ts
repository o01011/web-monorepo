import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {
	private readonly kafka = new Kafka({
		brokers: ['nestjs-boilerplate-kafka-broker:9092'],
	});
	private readonly producer: Producer = this.kafka.producer();

	async onModuleInit(): Promise<void> {
		await this.producer.connect();
	}

	async onApplicationShutdown(): Promise<void> {
		await this.producer.disconnect();
	}

	async produce(producerRecord: ProducerRecord) {
		await this.producer.send(producerRecord);
	}
}
