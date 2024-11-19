import Mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js'

const userSchema = new Mongoose.Schema({
    username: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String
}, { versionKey: false })

useVirtualId(userSchema)
const User = Mongoose.model('User', userSchema)
export async function findByUsername(username) {
    return User.findOne({ username })
}

export async function findById(id) {
    return User.findById(id)
}

export async function createUser(user) {
    return new User(user).save().then((data) => data.id)
}

function mapOptionalUser(user) { //user를 받아서
    return user ? { ...user, id: user._id.toString() } : user // user 의 값이 존재한다면 :왼쪽 값 리턴, 그게아니라면 그냥 오른쪽 리턴
}