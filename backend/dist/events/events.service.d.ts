import { Repository } from 'typeorm';
import { Event } from './event.entity';
export declare class EventsService {
    private eventsRepository;
    private readonly agoraAppId;
    private readonly agoraAppCertificate;
    constructor(eventsRepository: Repository<Event>);
    generateToken(channelName: string, uid?: number, role?: number): Promise<string>;
    findAll(): Promise<Event[]>;
    create(event: Partial<Event>): Promise<Event>;
    update(id: number, event: Partial<Event>): Promise<Event>;
}
