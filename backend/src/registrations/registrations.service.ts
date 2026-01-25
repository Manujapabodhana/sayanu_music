import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { CreateRegistrationDto } from './registrations.controller';

@Injectable()
export class RegistrationsService {
    constructor(
        @InjectRepository(Registration)
        private registrationsRepository: Repository<Registration>,
    ) { }

    create(createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
        return this.registrationsRepository.save(createRegistrationDto);
    }
}
