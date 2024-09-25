import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Suscribir al tópico de respuesta
    this.kafkaClient.subscribeToResponseOf('hero.kill.dragon');
    await this.kafkaClient.connect();
  }

  async killDragon(heroId: string, dragonId: string) {
    const message = {
        heroId: heroId,   
        dragonId: dragonId
    };
    
    return this.kafkaClient.send('hero.kill.dragon', message );
  }
}
