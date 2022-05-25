const Database = require('../database/config');

const create = async (req, res) => {
    const db = await Database();
    const existingRooms = await db.all('SELECT id FROM rooms');
    const { password } = req.body;

    let roomId = generateRoomId();

    // While room id repeat, generate another room id
    while (isRepeated(roomId)) {
        roomId = generateRoomId();
    }

    // Create room in rooms table
    await db.run(`INSERT INTO rooms (
            id,
            password
        ) VALUES (
            ${roomId},
            "${password}"
        )`);

    await db.close();

    res.redirect(`/room/${roomId}`);

    function isRepeated(roomId) {
        return existingRooms.some(room => room.id === roomId);
    }
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
    const db = await Database();

    const { roomId } = req.body;
    const existingRooms = await db.all('SELECT id FROM rooms');
    const roomIdExist = existingRooms.some(room => room.id == roomId); // Check if room id exist

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