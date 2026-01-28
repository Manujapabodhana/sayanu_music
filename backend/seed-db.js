const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

const sampleEvents = [
  {
    day: '24',
    month: 'FEB',
    type: 'Workshop',
    title: 'Introduction to Jazz Piano',
    time: '10:00 AM - 12:00 PM',
    isOnline: 0,
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
    isOnline: 1,
    location: null,
    description: 'Weekly live lesson focusing on advanced finger independence and articulation. Required session for advanced piano students preparing for recitals.',
    category: 'Classical'
  },
  {
    day: '02',
    month: 'MAR',
    type: 'Seminar',
    title: 'The History of the Grand Piano',
    time: '02:00 PM - 04:00 PM',
    isOnline: 0,
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
    isOnline: 0,
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
    isOnline: 1,
    location: null,
    description: 'Master the basics of music theory including scales, intervals, and chord progressions. Perfect for beginners.',
    category: 'Theory'
  },
  {
    day: '15',
    month: 'MAR',
    type: 'Live Lesson',
    title: 'Contemporary Pop Piano',
    time: '04:00 PM - 05:30 PM',
    isOnline: 1,
    location: null,
    description: 'Learn to play modern pop songs with contemporary chord voicings and rhythmic patterns.',
    category: 'Pop'
  }
];

console.log('🌱 Seeding events into database...\n');

const insert = db.prepare(`
  INSERT INTO event (day, month, type, title, time, isOnline, location, description, category)
  VALUES (@day, @month, @type, @title, @time, @isOnline, @location, @description, @category)
`);

const insertMany = db.transaction((events) => {
  for (const event of events) {
    insert.run(event);
  }
});

insertMany(sampleEvents);

const count = db.prepare('SELECT COUNT(*) as count FROM event').get();
console.log(`✅ Successfully seeded ${count.count} events!\n`);

const allEvents = db.prepare('SELECT * FROM event').all();
console.log('📅 Events in database:');
allEvents.forEach(event => {
  console.log(`  - ${event.title} (${event.day} ${event.month})`);
});

db.close();
