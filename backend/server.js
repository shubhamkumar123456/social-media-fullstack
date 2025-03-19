const express = require('express')
const app = express()
const port  = 8080;
const cors = require('cors')

const connection = require('./config/db') // coonectToDb -->function
connection()

const userRoutes = require('./routes/userRoutes')

app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend's URL
  credentials: true,               // Allow cookies and authorization headers
}));
app.use(express.json())

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.send('welcome  page')
})

app.use('/users',userRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})