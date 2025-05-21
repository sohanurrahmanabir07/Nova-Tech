const express=require('express')
const { router } = require('./Routes/route')
const { ConnnectDB } = require('./Database Connection/DB_Conneection')
const app=express()
const cors=require('cors')

const json=require('express-json')
app.use(express.json())
app.use(cors({
    origin:[process.env.URL]
}))
const port=process.env.Port || 3500
require('dotenv').config()

app.use('/api',router)

ConnnectDB()

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})