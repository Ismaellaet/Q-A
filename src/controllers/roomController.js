const Database = require('../database/config');

const create = async (req, res) => {
    const db = await Database();

    let roomId;
    let roomIdExist = true;

    const existingRoomId = await db.all('SELECT id FROM rooms'); // Get all existing roomId


    // While roomId exist, generate another roomId
    while (roomIdExist) {
        roomId = generateRoomId();
        roomIdExist = existingRoomId.some(id => id === roomId);
    }

    // If roomId doesn't exist in the table, create new room
    if (!roomIdExist) {
        const { password } = req.body;

        await db.run(`INSERT INTO rooms (
            id,
            password
        ) VALUES (
            ${roomId},
            "${password}"
        )`);

        await db.close();

        console.log(`Room ${roomId} created!`);
    }

    res.redirect(`/room/${roomId}`);
}

const open = async (req, res) => {
    const db = await Database();
    const { roomId } = req.params;
    const questions = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} AND read = 0`);
    const questionsRead = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} AND read = 1`);
    const hasQuestions = questions.length !== 0 || questionsRead.length !== 0;

    res.render('room', { roomId: roomId, questions: questions, questionsRead: questionsRead, hasQuestions: hasQuestions });
}

const enter = (req, res) => {
    const { roomId } = req.body;

    res.redirect(`/room/${roomId}`);
}

const generateRoomId = () => {
    const maxIdLength = 6;
    let roomId = "";

    for (i = 0; i < maxIdLength; i++) {
        roomId += Math.floor(Math.random() * 10).toString();
    }

    return roomId
}

module.exports = {
    create,
    open,
    enter,
}