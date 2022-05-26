const Database = require("../database/config");

const exec = async (req, res) => {
    const { roomId, roomType, targetId, action } = req.params;
    const { password } = req.body;

    const db = await Database();
    const currentRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);

    const roomTypes = {
        async answers() {
            const answer = await db.get(`SELECT * FROM answers WHERE id = ${targetId}`);

            res.redirect(`/room/${roomId}/${answer.questionId}/answer`);
        },

        questions() {
            res.redirect(`/room/${roomId}`);
        }
    }

    const actionTypes = {
        async delete() {
            // Delete all answers when the question is deleted
            if (roomType === 'questions') {
                await db.run(`DELETE FROM answers WHERE questionId = ${targetId}`);
            }

            await db.run(`DELETE FROM ${roomType} WHERE id = ${targetId}`);
        },

        async check() {
            await db.run(`UPDATE questions SET read = 1 WHERE id = ${targetId} `);
        }
    }

    const passwordIsValid = currentRoom.password == password;

    if (passwordIsValid) {
        const roomFunction = roomTypes[roomType];
        const actionFunction = actionTypes[action];

        roomFunction();
        actionFunction();
    } else {
        res.render(`passIncorrect`, { roomId: roomId });
    }
}

module.exports = {
    exec
}