import { EventsService } from './events.service';
import { Event } from './event.entity';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(): Promise<Event[]>;
    create(event: Partial<Event>): Promise<Event>;
}
