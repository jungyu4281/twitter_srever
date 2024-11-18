import express from 'express'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
import { sequelize } from './db/database.js'

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

// DB 연결 확인
// db.getConnection().then((connection)=>console.log(connection))
sequelize.sync().then(() =>{
    const server = app.listen(config.host.port)
    initSocket(server)
})


// app.listen(config.host.port)