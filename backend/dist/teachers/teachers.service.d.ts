import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
export declare class TeachersService {
    private teachersRepository;
    constructor(teachersRepository: Repository<Teacher>);
    findAll(page?: number, limit?: number, sort?: 'DESC' | 'ASC'): Promise<{
        data: Teacher[];
        total: number;
    }>;
    create(teacher: Partial<Teacher>): Promise<Teacher>;
}
