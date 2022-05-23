const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports = () => open({
    filename: './src/database/q-a.sqlite',
    driver: sqlite3.Database,
})