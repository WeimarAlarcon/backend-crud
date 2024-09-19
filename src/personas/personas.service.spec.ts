import { Test, TestingModule } from '@nestjs/testing';
import { PersonasService } from './personas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

describe('PersonasService', () => {
  let service: PersonasService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonasService],
      imports: [
        ConfigModule.forRoot({
          expandVariables: true,
        }),
        TypeOrmModule.forRoot({
          type: process.env.DB_TYPE as any,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([Persona])
      ],
    }).compile();

    service = module.get<PersonasService>(PersonasService);

    app = module.createNestApplication();
    await app.init();
  });
  
  // afterAll(async () => {
  //   await app.close();
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
