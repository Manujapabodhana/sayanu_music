import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    findAll(page?: number, limit?: number, sort?: 'DESC' | 'ASC'): Promise<{
        data: Teacher[];
        total: number;
    }>;
}
