import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

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
