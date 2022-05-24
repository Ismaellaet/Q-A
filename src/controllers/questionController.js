const Database = require("../database/config");

const create = async (req, res) => {
    const db = await Database();
    const { roomId } = req.params;
    const { question } = req.body;

    await db.run(`INSERT INTO questions (
        roomId,
        title,
        read
    ) VALUES (
        ${roomId},
        "${question}",
        0
    )`);

    await db.close();

    res.redirect(`/room/${roomId}`);
}

const action = async (req, res) => {
    const db = await Database();
    const { roomId, questionId, action } = req.params;
    const { password } = req.body;
    const currentRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);
    const validPassword = currentRoom.password == password;

    // If password is valid, execute action
    if (validPassword) {

        if (action === 'delete') { // Delete action
            await db.run(`DELETE FROM questions Where id = ${questionId}`);
        } else { // Read action
            await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
        }

        await db.close();

        res.redirect(`/room/${roomId}`);
    } else {
        res.render('passIncorrect', { roomId: roomId });
    }
}

module.exports = {
    create,
    action,
}
