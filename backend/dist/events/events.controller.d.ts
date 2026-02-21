import { EventsService } from './events.service';
import { Event } from './event.entity';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getToken(id: string): Promise<{
        token: string;
        channel: string;
    }>;
    findAll(): Promise<Event[]>;
    create(event: Partial<Event>): Promise<Event>;
    update(id: string, event: Partial<Event>): Promise<Event>;
}
