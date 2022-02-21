const express = require('express')
const server = express()
const routes = require('./routes')

server.set('view engine', 'ejs')

// Enable static files
server.use(express.static('public')) // 'Use' is for add functionalities in the server

// Ability req.body
server.use(express.urlencoded({extended: true}))

// Routes
server.use(routes)

// Server ON message
server.listen(3000, () => console.log('Server ON'))