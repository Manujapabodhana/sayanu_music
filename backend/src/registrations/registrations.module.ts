import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { Registration } from './registration.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Registration])],
    providers: [RegistrationsService],
    controllers: [RegistrationsController],
})
export class RegistrationsModule { }
