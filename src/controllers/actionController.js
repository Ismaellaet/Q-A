const Database = require("../database/config");

const exec = async (req, res) => {
    const db = await Database();

    const { roomId, roomType, targetId, action } = req.params;
    const { password } = req.body;
    const currentRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);
    const validPassword = currentRoom.password == password;

    if (validPassword) {
        if (roomType == 'answers') {
            const answer = await db.get(`SELECT * FROM answers WHERE id = ${targetId}`)

            res.redirect(`/room/${roomId}/${answer.questionId}/answer`);
        } else {
            res.redirect(`/room/${roomId}`);
        }

        if (action === 'delete') {
            await db.run(`DELETE FROM ${roomType} WHERE id = ${targetId}`);
        } else {
            await db.run(`UPDATE questions SET read = 1 WHERE id = ${targetId} `);
        }

    } else {
        res.render(`passIncorrect`, { roomId: roomId });
    }
}

module.exports = {
    exec
}