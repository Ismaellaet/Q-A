const express = require('express');
const QuestionController = require('./controllers/questionController');
const RoomController = require('./controllers/roomController');
const AnswerController = require('./controllers/answerController');
const ActionController = require('./controllers/actionController');

const route = express.Router();

route.get('/', (req, res) => res.render('home', { page: 'enter-room', classError: 'message-error' }));

route.get('/create-room', (req, res) => res.render('home', { page: 'create-room' }));

route.get('/room/:roomId', RoomController.open);

route.get('/room/:roomId/:questionId/answer', RoomController.answer);

route.post('/enter-room', RoomController.enter);

route.post('/room/create-room', RoomController.create);

route.post('/room/create/:roomId', QuestionController.create);

route.post('/room/answer/:roomId/:questionId', AnswerController.create);

route.post('/room/:roomId/:roomType/:targetId/:action', ActionController.exec);


module.exports = route;