const create = (req, res) => {
    const roomId = generateRoomId();
    const { password } = req.body;

    console.log(`${roomId} ${password}`);

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