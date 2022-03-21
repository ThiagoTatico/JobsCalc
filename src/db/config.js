const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // get only 'open' function in sqlite

module.exports = () => {  // The 'open' needs to be inside a function structure
  open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })
}
