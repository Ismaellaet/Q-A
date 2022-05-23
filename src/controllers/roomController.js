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


const generateRoomId = () => {
    const maxIdLength = 6;
    let roomId = "";

    for (i = 0; i < maxIdLength; i++) {
        roomId += Math.floor(Math.random() * 10).toString();
    }

    return roomId
}

module.exports = {
    create
}