const express = require('express');
const QuestionController = require('./controllers/questionController');
const RoomController = require('./controllers/roomController');

const route = express.Router();

route.get('/', (req, res) => res.render('home', { page: 'enter-room' }));

route.get('/create-room', (req, res) => res.render('home', { page: 'create-room' }));

route.get('/room/:roomId', (req, res) => res.render('room'));

route.post('/room/:roomId/:questionId/:action', QuestionController.action);

route.post('/room/create-room', RoomController.create)

module.exports = route;