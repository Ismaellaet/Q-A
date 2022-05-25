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

module.exports = {
    create,
}
