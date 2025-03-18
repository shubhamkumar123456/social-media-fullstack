const express = require('express')
const app = express()
const port  = 8080;
const cors = require('cors')

const connection = require('./config/db') // coonectToDb -->function
connection()

const userRoutes = require('./routes/userRoutes')

app.use(cors())
app.use(express.json())

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.send('welcome  page')
})

app.use('/users',userRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})