const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // get only 'open' function in sqlite

// The 'open' needs to be inside a function structure
module.exports = () =>
  open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })
