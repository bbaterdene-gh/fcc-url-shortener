// libraries
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

// create app
const app = express()
mongoose.connect('mongodb+srv://admin:2ltsXICcgTNRPL0u@url-shortener.jynjf.mongodb.net/url-shortener?retryWrites=true&w=majority',  { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// routes
const indexRouter = require('./routes/index')
app.use('/', indexRouter)
const shortURLRouter = require('./routes/shortURL')
app.use('/api', shortURLRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
