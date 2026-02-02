import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { Event } from '../events/event.entity';
import { CreateRegistrationDto } from './registrations.controller';
export declare class RegistrationsService {
    private registrationsRepository;
    private eventsRepository;
    constructor(registrationsRepository: Repository<Registration>, eventsRepository: Repository<Event>);
    create(createRegistrationDto: CreateRegistrationDto): Promise<Registration>;
    findAll(): Promise<Registration[]>;
}
