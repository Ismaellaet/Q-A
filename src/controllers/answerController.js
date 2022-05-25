const Database = require("../database/config");

const create = async (req, res) => {
    const db = await Database();
    const { roomId, questionId } = req.params;
    const { answer } = req.body;

    await db.run(`INSERT INTO answers (
        questionId,
        content
    ) VALUES (
        ${questionId},
        "${answer}"
    )`);

    await db.close();

    res.redirect(`/room/${roomId}/${questionId}/answer`);
}

module.exports = {
    create,
}