import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { Registration } from './registration.entity';
import { Event } from '../events/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Registration, Event])],
    providers: [RegistrationsService],
    controllers: [RegistrationsController],
})
export class RegistrationsModule { }
