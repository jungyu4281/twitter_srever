import express from 'express'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
// import { db } from './db/database.js'
// npm i cors
import cors from 'cors'

const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}))


app.use(express.json())

app.use('/tweets', tweetsRouter)
app.use('/auth', authRouter)

app.use((req,res,next) =>{
    res.sendStatus(404)
})

// db.getConnection().then((connection)=>console.log(connection))
const server = app.listen(config.host.port)
initSocket(server)


// app.listen(config.host.port)