const express = require('express')
const server = express()

server.listen(3000, () => console.log('Server ON'))

server.get('/', (request, response) => {
  return response.sendFile(__dirname + '/views/index.html')
})
