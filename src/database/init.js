const Database = require('./config');

const initDB = {
    async init() {
        const db = await Database();

        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            password TEXT
        )`);

        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roomId INTEGER,            
            title TEXT,
            read INTEGER
        )`);

        await db.exec(`CREATE TABLE answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            questionId INTEGER,            
            content TEXT
        )`);

        await db.close();
    }
}

initDB.init();