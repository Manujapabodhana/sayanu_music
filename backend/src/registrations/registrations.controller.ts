import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Registration } from './registration.entity';

export class CreateRegistrationDto {
    eventId: number;
    userEmail: string;
    userName: string;
}

@Controller('registrations')
export class RegistrationsController {
    constructor(private readonly registrationsService: RegistrationsService) { }

    @Post()
    create(@Body() createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
        return this.registrationsService.create(createRegistrationDto);
    }

    @Get()
    findAll(): Promise<Registration[]> {
        return this.registrationsService.findAll();
    }
}
