const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')   
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const app = express()
const cors = require('cors')



app.use(cors())
app.use(express.json())
dotEnv.config()
const PORT = process.env.Port|| 5000

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB Connected Successfully!")
})
.catch((error)=>{
    console.log(`${error}`)
})



app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)


app.listen(PORT,()=>{
    console.log(`Server Started and running at ${PORT}`)
})