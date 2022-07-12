const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const bodyParser = require('body-parser')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
    titleThis: function() {
      return this.title
    },
    
    completedThis: function(user) {
      return user.completed
    },

    idThis: function() {
      return this._id
    }
  }
})

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + '/public')))
app.use(todoRoutes)

async function start( ) {
  try{
    console.log(process.env.MONGO_CONNECTION_LINK)
    await mongoose.connect(process.env.MONGO_CONNECTION_LINK)

    app.listen(PORT, () => {
      console.log('running...')
    })

  } catch(e) {
    console.log(e)
  }
}

start()

