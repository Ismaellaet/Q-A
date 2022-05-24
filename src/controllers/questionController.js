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

const action = (req, res) => {
    const { roomId, questionId, action } = req.params;
    const { password } = req.body;

    console.log(`roomId = ${roomId}
         questionId = ${questionId}
         action = ${action}
         password = ${password}`);
}

module.exports = {
    create,
    action,
}
