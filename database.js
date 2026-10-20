import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDBConnection() {
  return open({
    filename: './inventory.db',
    driver: sqlite3.Database
  });
}

export async function setupDatabase() {
  const db = await getDBConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      price TEXT,
      image TEXT
    );
  `);

  const row = await db.get("SELECT COUNT(*) AS count FROM inventory");

  if (row.count === 0) {
    await db.run(
      `INSERT INTO inventory (title, price, image) VALUES (?, ?, ?)`,
      ["Silent Hill 2", "$45.99", "/images/silenthill2.png"]
    );
    await db.run(
      `INSERT INTO inventory (title, price, image) VALUES (?, ?, ?)`,
      ["Grand Theft Auto 6", "$70", "/images/GTA6.png"]
    );
    await db.run(
      `INSERT INTO inventory (title, price, image) VALUES (?, ?, ?)`,
      ["Destiny 3", "$70", "/images/Destiny3.png"]
    );
  }
}