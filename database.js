import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export const setupDatabase = () => {
    return open ({
        filename: './public/database/inventory.db',
        driver: sqlite3.Database
    }).then (db => {
        return db.exec(`
            CREATE TABLE IF NOT EXISTS inventory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                genre TEXT,
                cost DECIMAL(10,2),
                stock INTEGER,
                rating DECIMAL(3,1),
                image_url TEXT
                )
            `).then(() => {
                return db.run(`
                    INSERT INTO inventory (name, genre, cost, stock, rating, image_url)
                    VALUES
                        ('Silent Hill 2', 'Horror', 45.99, 15, 4.7, '/images/silenthill2.png'),
                        ('Grand Theft Auto 6', 'Action', 70, 21, 5.0, '/images/GTA6.png'),
                        ('Destiny 3', 'Looter', 70, 11, 4.3, '/images/Destiny3.png')
                    `);
            }).then(() => {
                console.log('Database setup complete. ');
            });
    });
};

export const getDBConnection = () => {
    return open({
        filename: './public/database/inventory.db',
        driver: sqlite3.Database
    });
};