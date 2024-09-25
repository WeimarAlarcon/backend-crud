import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaGateway } from 'src/kafka/kafka.gateway';
import { NotificacionGateway } from 'src/notificacion/notificacion.gateway';
import { PersonaGateway } from './persona.gateway';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller('personas')
export class PersonasController {
  
  constructor(
    private readonly personasService: PersonasService,
    private readonly kafkaGateway: KafkaGateway,
    private readonly notificacionGateway: NotificacionGateway,
    private readonly personaGateway: PersonaGateway,
  ) {}

  @WebSocketServer()
  server: Server;

  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    return await this.personasService.create(createPersonaDto);
  }
  
  @MessagePattern('persona.nueva.registrada')
  personaCreada(@Payload() persona: CreatePersonaDto): any {
    // console.log('Tipo de persona:', typeof persona); 
    // console.log('Persona recibida:', JSON.stringify(persona, null, 2));
    this.personaGateway.mensajeRespuesta(persona);
    return persona;
  }

  @Get()
  async findAll() {
    return await this.personasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.personasService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return await this.personasService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.personasService.remove(+id);
  }
}
