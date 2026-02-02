import { RegistrationsService } from './registrations.service';
import { Registration } from './registration.entity';
export declare class CreateRegistrationDto {
    eventId: number;
    userEmail: string;
    userName: string;
}
export declare class RegistrationsController {
    private readonly registrationsService;
    constructor(registrationsService: RegistrationsService);
    create(createRegistrationDto: CreateRegistrationDto): Promise<Registration>;
    findAll(): Promise<Registration[]>;
}
