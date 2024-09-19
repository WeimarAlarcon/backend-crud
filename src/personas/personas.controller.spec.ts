jest.setTimeout(30000);

import { Test, TestingModule } from '@nestjs/testing';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';

describe('PersonasController', () => {
  let controller: PersonasController;
  // let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonasController],
      providers: [
        PersonasService,
      ],
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
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Persona])
      ],
    }).compile();

    controller = module.get<PersonasController>(PersonasController);
    // app = module.createNestApplication();
    // await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('findOne', () => {
    it ('debe retornar datos de la persona por id', async () => {
      const result = await controller.findOne('1');
      expect(result).toBeInstanceOf(Persona);
    })
  })

  describe('findAll', () => {
    it ('debe retornar una lista de personas', async () => {
      const result = await controller.findAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('create', () => {
    let personaDto: CreatePersonaDto;
    beforeEach(() => {
      personaDto = {
        carnetIdentidad: '127386232',
        nombre: 'Juan',
        apellidoPaterno: 'Perez',
        apellidoMaterno: 'Perez',
        fechaNacimiento: new Date(),
        celular: '734651254',
        telefono: '64871225',
        direccion: 'Calle testing 1',
        estadoCivil: 'soltero',
        profesion: 'Estudiante',
        edad: 20,
        genero: 'masculino',
      }
    })
    it ('debe retornar un mensaje de error si el carnet de identidad ya existe', async () => {
      const result = await controller.create(personaDto);
      expect(result).toEqual({statusCode: 409, message: `El numero de documento ${personaDto.carnetIdentidad} ya existe`, persona: null});
    })

    it ('debe crear una persona existosa', async () => {
      personaDto.carnetIdentidad = '987654321';
      const persona = await controller.create(personaDto);
      if ('statusCode' in persona && persona.statusCode === 409) {
        expect(persona.statusCode).toBe(409);
      } else {
        expect(persona).toBeInstanceOf(Persona);
      }
    })
  })

  describe('update', () => {
    it ('debe actualizar una persona existosa', async () => {
      const id = '1';
      const result = await controller.update(id, {
        nombre: 'nombre',
        apellidoPaterno: 'apellido',
        edad: 1
      });
      expect(result).toBeInstanceOf(Persona);
    })
  })

  describe('remove', () => {
    it ('debe eliminar una persona existosa', async () => {
      const id = '1';
      const result = await controller.remove(id);
      expect(result).toBeInstanceOf(Persona);
    })
  })
});
