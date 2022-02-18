const express = require('express')
const server = express()

// Enable static files
server.use(express.static('public')) // 'Use' is for add functionalities in the server

server.get('/', (request, response) => {
  return response.sendFile(__dirname + '/views/index.html')
})

server.listen(3000, () => console.log('Server ON'))