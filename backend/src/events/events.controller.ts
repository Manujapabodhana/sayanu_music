import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get(':id/token')
    async getToken(@Param('id') id: string): Promise<{ token: string; channel: string }> {
        const channelName = `event-${id}`;
        // For simplicity, we use uid 0 (let Agora assign uid) or allow anonymous
        const token = await this.eventsService.generateToken(channelName);
        return { token, channel: channelName };
    }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventsService.findAll();
    }

    @Post()
    create(@Body() event: Partial<Event>): Promise<Event> {
        return this.eventsService.create(event);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() event: Partial<Event>): Promise<Event> {
        return this.eventsService.update(+id, event);
    }
}
