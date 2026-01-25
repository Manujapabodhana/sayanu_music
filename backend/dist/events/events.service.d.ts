import { Repository } from 'typeorm';
import { Event } from './event.entity';
export declare class EventsService {
    private eventsRepository;
    constructor(eventsRepository: Repository<Event>);
    findAll(): Promise<Event[]>;
    create(event: Partial<Event>): Promise<Event>;
}
