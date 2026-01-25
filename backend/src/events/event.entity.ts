import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: string;

    @Column()
    month: string;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    time: string;

    @Column({ nullable: true })
    location: string;

    @Column({ default: false })
    isOnline: boolean;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    category: string;
}
