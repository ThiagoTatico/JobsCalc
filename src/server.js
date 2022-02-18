const express = require('express')
const server = express()
const routes = require('./routes')

// Enable static files
server.use(express.static('public')) // 'Use' is for add functionalities in the server

// Routes
server.use(routes)



server.listen(3000, () => console.log('Server ON'))