import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    findAll(): Promise<Event[]> {
        return this.eventsRepository.find({ order: { id: 'ASC' } });
    }

    create(event: Partial<Event>): Promise<Event> {
        return this.eventsRepository.save(event);
    }

    async update(id: number, event: Partial<Event>): Promise<Event> {
        await this.eventsRepository.update(id, event);
        return this.eventsRepository.findOneOrFail({ where: { id } });
    }
}
