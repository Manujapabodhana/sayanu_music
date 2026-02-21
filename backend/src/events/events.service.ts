import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

@Injectable()
export class EventsService {
    private readonly agoraAppId = process.env.AGORA_APP_ID;
    private readonly agoraAppCertificate = process.env.AGORA_APP_CERTIFICATE;

    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    async generateToken(channelName: string, uid: number = 0, role: number = RtcRole.PUBLISHER): Promise<string> {
        const appId = this.agoraAppId;
        const cert = this.agoraAppCertificate;

        if (!appId || !cert) {
            throw new Error('Agora credentials not configured');
        }

        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        return RtcTokenBuilder.buildTokenWithUid(
            appId,
            cert,
            channelName,
            uid,
            role,
            privilegeExpiredTs,
        );
    }

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
