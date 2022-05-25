const Database = require('../database/config');

const create = async (req, res) => {
    const db = await Database();

    let roomId;
    let roomIdExist = true;

    const existingRooms = await db.all('SELECT id FROM rooms'); // Get all existing rooms


    // While room id exist, generate another room id
    while (roomIdExist) {
        roomId = generateRoomId();
        roomIdExist = existingRooms.some(room => room.id === roomId);
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

    res.render('room', {
        page: 'questions-room',
        roomId: roomId,
        questions: questions,
        questionsRead: questionsRead,
        hasQuestions: hasQuestions
    });
}

const answer = async (req, res) => {
    const db = await Database();

    const { roomId, questionId } = req.params;
    const question = await db.get(`SELECT * FROM questions WHERE id = ${questionId}`);
    const answers = await db.all(`SELECT * FROM answers WHERE questionId = ${questionId}`);
    const hasAnswers = answers.length !== 0;



    res.render('room', {
        page: 'answers-room',
        roomId: roomId,
        question: question,
        answers: answers,
        hasAnswers: hasAnswers
    });
}

const enter = async (req, res) => {
    const { roomId } = req.body;

    const db = await Database();
    const existingRooms = await db.all('SELECT id FROM rooms'); // Get all existing rooms
    const roomIdExist = existingRooms.some(room => room.id == roomId); // Check if room id exist

    // If room id exist, enter the room
    if (roomIdExist) {
        res.redirect(`/room/${roomId}`);
    } else {
        res.render('home', { page: 'enter-room', classError: 'message-error active' }); // Display error message, adding class 'active' on error
    }
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
    answer,
    enter,
}