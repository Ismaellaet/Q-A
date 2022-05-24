const express = require('express');
const QuestionController = require('./controllers/questionController');
const RoomController = require('./controllers/roomController');

const route = express.Router();

route.get('/', (req, res) => res.render('home', { page: 'enter-room', classError: 'message-error' }));

route.get('/create-room', (req, res) => res.render('home', { page: 'create-room' }));

route.get('/room/:roomId', RoomController.open);

route.post('/enter-room', RoomController.enter);

route.post('/room/create-room', RoomController.create);

route.post('/room/create/:roomId', QuestionController.create);

route.post('/room/:roomId/:questionId/:action', QuestionController.action);


module.exports = route;