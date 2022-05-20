module.exports = {
    action(req, res) {
        const roomId = req.params.roomId;
        const questionId = req.params.questionId;
        const action = req.params.action;
        const password = req.body.password;

        console.log(`roomId = ${roomId}
         questionId = ${questionId}
         action = ${action}
         password = ${password}`);
    }
}