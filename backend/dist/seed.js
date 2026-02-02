"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("./events/event.entity");
const sampleEvents = [
    {
        day: '24',
        month: 'FEB',
        type: 'Workshop',
        title: 'Introduction to Jazz Piano',
        time: '10:00 AM - 12:00 PM',
        isOnline: false,
        location: 'Music Hall A',
        description: 'A deep dive into jazz improvisation and harmony. Learn the basics of jazz piano, including 7th chords, swing rhythm, and blues scales. Ideal for intermediate players.',
        category: 'Piano'
    },
    {
        day: '28',
        month: 'FEB',
        type: 'Live Lesson',
        title: 'Advanced Classical Techniques',
        time: 'Live Session',
        isOnline: true,
        description: 'Weekly live lesson focusing on advanced finger independence and articulation. Required session for advanced piano students preparing for recitals.',
        category: 'Classical'
    },
    {
        day: '02',
        month: 'MAR',
        type: 'Seminar',
        title: 'The History of the Grand Piano',
        time: '02:00 PM - 04:00 PM',
        isOnline: false,
        location: 'Main Auditorium',
        description: 'Annual guest lecture by industry experts on the evolution of the piano. Discover how the instrument has changed over centuries.',
        category: 'Music History'
    },
    {
        day: '05',
        month: 'MAR',
        type: 'Meeting',
        title: 'Parents & Teachers Association',
        time: '05:00 PM - 06:30 PM',
        isOnline: false,
        location: 'Conference Room B',
        description: 'Open forum for parents to discuss the upcoming semester curriculum updates and feedback on the new live lesson platform.',
        category: 'Community'
    },
    {
        day: '10',
        month: 'MAR',
        type: 'Workshop',
        title: 'Music Theory Fundamentals',
        time: '01:00 PM - 03:00 PM',
        isOnline: true,
        description: 'Master the basics of music theory including scales, intervals, and chord progressions. Perfect for beginners.',
        category: 'Theory'
    },
    {
        day: '15',
        month: 'MAR',
        type: 'Live Lesson',
        title: 'Contemporary Pop Piano',
        time: '04:00 PM - 05:30 PM',
        isOnline: true,
        description: 'Learn to play modern pop songs with contemporary chord voicings and rhythmic patterns.',
        category: 'Pop'
    },
    {
        day: '20',
        month: 'MAR',
        type: 'Workshop',
        title: 'Sight Reading Mastery',
        time: '11:00 AM - 01:00 PM',
        isOnline: false,
        location: 'Practice Room 3',
        description: 'Improve your sight reading skills with proven techniques and daily exercises.',
        category: 'Skills'
    },
    {
        day: '25',
        month: 'MAR',
        type: 'Seminar',
        title: 'Music Production Basics',
        time: '03:00 PM - 05:00 PM',
        isOnline: true,
        description: 'Introduction to digital audio workstations and music production techniques.',
        category: 'Production'
    }
];
async function seed() {
    console.log('🌱 Initializing NestJS application for seeding...\n');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const eventRepository = app.get((0, typeorm_1.getRepositoryToken)(event_entity_1.Event));
        const existingCount = await eventRepository.count();
        if (existingCount > 0) {
            console.log(`📊 Found ${existingCount} existing events in database`);
            console.log('🗑️  Clearing existing events...\n');
            await eventRepository.clear();
        }
        console.log('📝 Creating events using TypeORM...\n');
        const events = await eventRepository.save(sampleEvents);
        console.log(`✅ Successfully seeded ${events.length} events!\n`);
        console.log('📅 Events in database:');
        events.forEach(event => {
            const location = event.isOnline ? '🌐 Online' : `📍 ${event.location}`;
            console.log(`  ${event.id}. ${event.title}`);
            console.log(`     ${event.day} ${event.month} | ${event.time} | ${location}`);
            console.log(`     ${event.type} - ${event.category}\n`);
        });
        await app.close();
        console.log('✅ Seeding completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        await app.close();
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map