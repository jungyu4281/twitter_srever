import Mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js'
import * as UserRepository from './auth.js'
const tweetSchema = new Mongoose.Schema({
    text: { type: String, require: true },
    userId: { type: String, require: true },
    name: { type: String, require: true },
    username: { type: String, require: true },
    url: String
}, { timestamps: true })
useVirtualId(tweetSchema)
const Tweet = Mongoose.model('Tweet', tweetSchema)
export async function getAll() {
    return Tweet.find().sort({ createdAt: -1 })
}
export async function getAllByUsername(username) {
    return Tweet.find({ username }).sort({ createdAt: -1 })
}
export async function getById(id) {
    return Tweet.findById(id)
}
export async function create(text, userId) {
    return UserRepository.findById(userId)
        .then((user) => new Tweet({
            text,
            userId,
            name: user.name,
            username: user.username
        }).save())
}
export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id, { text }, { returnDocument: 'after' })
}
export async function remove(id) {
    return Tweet.findByIdAndDelete(id)
}
