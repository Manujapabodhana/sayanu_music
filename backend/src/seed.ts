import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventsService } from './events/events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from './events/event.entity';
import { Repository } from 'typeorm';

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

import { Teacher } from './teachers/teacher.entity';

// ... (existing imports)

const sampleTeachers = [
  {
    name: "Arthur Pendelton",
    photo: "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano", "Music Theory"],
    rating: 4.9,
    hourlyRate: 60,
    bio: "Renowned for his mastery of Beethoven and Chopin, bringing 30 years of concert experience.",
    isApproved: true
  },
  {
    name: "Lila Vaughn",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano", "Jazz"],
    rating: 4.8,
    hourlyRate: 55,
    bio: "Teaches the art of swing, bebop, and modern jazz fusion with creative freedom.",
    isApproved: true
  },
  {
    name: "Sarah Chen",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano"],
    rating: 4.7,
    hourlyRate: 40,
    bio: "Patient and encouraging, perfect for students taking their very first steps in piano.",
    isApproved: true
  },
  {
    name: "Marcus Thorne",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano", "Composition"],
    rating: 4.9,
    hourlyRate: 75,
    bio: "Guiding students to write their own masterpieces while mastering the keys.",
    isApproved: true
  },
  {
    name: "Ms. Daisy",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano"],
    rating: 4.6,
    hourlyRate: 35,
    bio: "Making piano learning a magical adventure for children ages 4-10.",
    isApproved: true
  },
  {
    name: "Dr. James Wilson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano", "Music Theory"],
    rating: 5.0,
    hourlyRate: 80,
    bio: "Understanding the 'why' behind the music to unlock deeper performance.",
    isApproved: true
  },
  {
    name: "Elena Rodriguez",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano", "Latin Jazz"],
    rating: 4.8,
    hourlyRate: 50,
    bio: "Infusing rhythmic complexity and latin grooves into your repertoire.",
    isApproved: true
  },
  {
    name: "Sofia Kovar",
    photo: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano"],
    rating: 4.9,
    hourlyRate: 70,
    bio: "High-level technical training for competitive pianists and performance majors.",
    isApproved: true
  },
  {
    name: "Jax Miller",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano", "Synth"],
    rating: 4.5,
    hourlyRate: 45,
    bio: "Learn to play top 40 hits, accompany singers, and master synthesizers.",
    isApproved: true
  },
  {
    name: "Leo Vance",
    photo: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano", "Reading"],
    rating: 4.7,
    hourlyRate: 50,
    bio: "Building rock-solid reading skills to play any piece of music on sight.",
    isApproved: true
  },
  {
    name: "Unapproved User",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    instruments: ["Piano"],
    rating: 2.0,
    hourlyRate: 10,
    bio: "I am not approved yet.",
    isApproved: false
  }
];

async function seed() {
  console.log('🌱 Initializing NestJS application for seeding...\n');

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const eventRepository = app.get<Repository<Event>>(getRepositoryToken(Event));
    const teacherRepository = app.get<Repository<Teacher>>(getRepositoryToken(Teacher));

    // Seed Events
    const existingCount = await eventRepository.count();

    if (existingCount > 0) {
      console.log(`📊 Found ${existingCount} existing events in database`);
      console.log('🗑️  Clearing existing events...\n');
      await eventRepository.clear();
    }

    console.log('📝 Creating events using TypeORM...\n');
    const events = await eventRepository.save(sampleEvents);
    console.log(`✅ Successfully seeded ${events.length} events!\n`);

    // Seed Teachers
    const existingTeacherCount = await teacherRepository.count();
    if (existingTeacherCount > 0) {
      console.log(`📊 Found ${existingTeacherCount} existing teachers in database`);
      console.log('🗑️  Clearing existing teachers...\n');
      await teacherRepository.clear();
    }

    console.log('📝 Creating teachers using TypeORM...\n');
    const teachers = await teacherRepository.save(sampleTeachers);
    console.log(`✅ Successfully seeded ${teachers.length} teachers!\n`);

    // Display seeded events
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
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await app.close();
    process.exit(1);
  }
}

seed();
