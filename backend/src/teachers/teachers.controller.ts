import { Controller, Get, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) { }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sort') sort: 'DESC' | 'ASC' = 'DESC',
    ) {
        return this.teachersService.findAll(page, limit, sort);
    }
}
