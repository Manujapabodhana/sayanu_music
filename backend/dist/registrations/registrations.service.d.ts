import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { CreateRegistrationDto } from './registrations.controller';
export declare class RegistrationsService {
    private registrationsRepository;
    constructor(registrationsRepository: Repository<Registration>);
    create(createRegistrationDto: CreateRegistrationDto): Promise<Registration>;
}
