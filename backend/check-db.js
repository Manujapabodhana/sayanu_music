const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

console.log('\n📊 Database Tables:');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(tables);

console.log('\n📅 Events in database:');
try {
  const events = db.prepare('SELECT * FROM event').all();
  console.log(`Total events: ${events.length}`);
  console.log(events);
} catch (error) {
  console.log('Error reading events:', error.message);
}

db.close();
