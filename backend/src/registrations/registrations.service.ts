import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { Event } from '../events/event.entity';
import { CreateRegistrationDto } from './registrations.controller';

@Injectable()
export class RegistrationsService {
    constructor(
        @InjectRepository(Registration)
        private registrationsRepository: Repository<Registration>,
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    async create(createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
        const event = await this.eventsRepository.findOne({ where: { id: createRegistrationDto.eventId } });
        if (!event) {
            throw new Error('Event not found');
        }
        const registration = {
            ...createRegistrationDto,
            eventName: event.title,
        };
        return this.registrationsRepository.save(registration);
    }
}
