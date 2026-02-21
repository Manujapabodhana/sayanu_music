import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Teacher)
        private teachersRepository: Repository<Teacher>,
    ) { }

    async findAll(page: number = 1, limit: number = 10, sort: 'DESC' | 'ASC' = 'DESC'): Promise<{ data: Teacher[], total: number }> {
        const [data, total] = await this.teachersRepository.findAndCount({
            where: { isApproved: true },
            order: { rating: sort },
            take: limit,
            skip: (page - 1) * limit,
        });

        return { data, total };
    }

    create(teacher: Partial<Teacher>): Promise<Teacher> {
        return this.teachersRepository.save(teacher);
    }
}
