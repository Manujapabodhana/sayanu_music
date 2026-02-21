import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    photo: string; // URL to photo

    @Column("simple-array")
    instruments: string[];

    @Column("float")
    rating: number;

    @Column("int")
    hourlyRate: number; // in USD or relevant currency

    @Column("text")
    bio: string;

    @Column({ default: false })
    isApproved: boolean;
}
