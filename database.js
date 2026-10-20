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

  await db.exec(`DROP TABLE IF EXISTS inventory;`);

  await db.exec(`
    CREATE TABLE inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      cost TEXT,
      image_url TEXT,
      genre TEXT,
      stock INTEGER,
      rating REAL
    );
  `);

  await db.run(
    `INSERT INTO inventory (name, cost, image_url, genre, stock, rating) VALUES (?, ?, ?, ?, ?, ?)`,
    ["Silent Hill 2", "45.99", "/images/silenthill2.png", "Horror", 15, 4.8]
  );
  await db.run(
    `INSERT INTO inventory (name, cost, image_url, genre, stock, rating) VALUES (?, ?, ?, ?, ?, ?)`,
    ["Grand Theft Auto 6", "70.00", "/images/GTA6.png", "Action", 50, 5.0]
  );
  await db.run(
    `INSERT INTO inventory (name, cost, image_url, genre, stock, rating) VALUES (?, ?, ?, ?, ?, ?)`,
    ["Destiny 3", "70.00", "/images/Destiny3.png", "FPS", 30, 4.5]
  );
}