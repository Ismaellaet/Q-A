const action = (req, res) => {
    const { roomId, questionId, action } = req.params;
    const { password } = req.body;

    console.log(`roomId = ${roomId}
         questionId = ${questionId}
         action = ${action}
         password = ${password}`);
}

module.exports = {
    action
}
