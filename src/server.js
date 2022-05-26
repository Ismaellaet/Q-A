const express = require('express');
const path = require('path');
const route = require('./route');
const server = express();
const PORT = process.env.PORT || 3000;

server.set('view engine', 'ejs');

server.set('views', path.join(__dirname, 'views'));

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true })); // Middleware

server.use(route);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));