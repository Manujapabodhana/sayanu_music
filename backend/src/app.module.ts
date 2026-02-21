import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { TeachersModule } from './teachers/teachers.module';
import { Event } from './events/event.entity';
import { Registration } from './registrations/registration.entity';
import { Teacher } from './teachers/teacher.entity';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get<string>('DATABASE_PATH') || 'database.sqlite',
        entities: [Event, Registration, Teacher], // Add Teacher entity
        synchronize: true, // Only for development!
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    RegistrationsModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule { }
