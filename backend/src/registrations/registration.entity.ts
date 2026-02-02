import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Registration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: number;

    @Column({ nullable: true })
    eventName: string;

    @Column()
    userEmail: string;

    @Column()
    userName: string;

    @CreateDateColumn()
    registeredAt: Date;
}
