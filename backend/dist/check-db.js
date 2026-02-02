"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("./events/event.entity");
const registration_entity_1 = require("./registrations/registration.entity");
async function checkDatabase() {
    console.log('\n📊 Checking Database with TypeORM...\n');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const eventRepository = app.get((0, typeorm_1.getRepositoryToken)(event_entity_1.Event));
        const registrationRepository = app.get((0, typeorm_1.getRepositoryToken)(registration_entity_1.Registration));
        const eventCount = await eventRepository.count();
        const registrationCount = await registrationRepository.count();
        console.log('✅ Database connected successfully');
        console.log(`📁 Database: ${process.env.DATABASE_PATH || 'database.sqlite'}\n`);
        console.log('📈 Statistics:');
        console.log(`   Total Events: ${eventCount}`);
        console.log(`   Total Registrations: ${registrationCount}\n`);
        if (eventCount > 0) {
            console.log('📅 Events in Database:');
            const events = await eventRepository.find({ order: { id: 'ASC' } });
            events.forEach(event => {
                const location = event.isOnline ? '🌐 Online' : `📍 ${event.location}`;
                console.log(`\n   ${event.id}. ${event.title}`);
                console.log(`      Date: ${event.day} ${event.month}`);
                console.log(`      Time: ${event.time}`);
                console.log(`      Type: ${event.type} | Category: ${event.category || 'N/A'}`);
                console.log(`      Location: ${location}`);
                console.log(`      Description: ${event.description.substring(0, 80)}...`);
            });
            console.log('');
        }
        else {
            console.log('⚠️  No events found in database');
            console.log('   💡 Run: npm run seed\n');
        }
        if (registrationCount > 0) {
            console.log('📝 Recent Registrations:');
            const registrations = await registrationRepository.find({
                take: 5,
                order: { id: 'DESC' }
            });
            registrations.forEach(reg => {
                console.log(`   • ${reg.userName} (${reg.userEmail}) - ${reg.eventName} (Event #${reg.eventId})`);
            });
            console.log('');
        }
        await app.close();
        console.log('✅ Database check completed\n');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error checking database:', error);
        await app.close();
        process.exit(1);
    }
}
checkDatabase();
//# sourceMappingURL=check-db.js.map