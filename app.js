const express = require('express')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const createError = require('http-errors')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerDocument = require('./commons/swagger')
const mongoose = require('mongoose')
const artist = require('./routes/artist')
const album = require('./routes/album')

mongoose.connect('mongodb+srv://samuel:Sam13792805@cluster0-leqzf.mongodb.net/musiccollection?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: fs.createWriteStream('app.log', { flags: 'a' }) }))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))
app.use('/docs', swaggerUi.serve)
app.get('/docs', swaggerUi.setup(swaggerJsdoc(swaggerDocument)))
app.use('/artist', artist)
app.use('/album', album)

app.use((req, res, next) => {
  next(createError(404))
})
app.use((err, req, res, next) => {
  next(err)
})

module.exports = app
