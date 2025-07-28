import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, ProducerRecord, Partitioners } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {
	private readonly kafkaBrokerPort: number;
	private readonly kafka: Kafka;
	private readonly producer: Producer;

	constructor(private readonly configService: ConfigService) {
		this.kafkaBrokerPort = this.configService.get<number>('KAFKA_PORT');
		this.kafka = new Kafka({
			brokers: [`nestjs-boilerplate-kafka-broker:${this.kafkaBrokerPort}`],
		});
		this.producer = this.kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
	}

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
