import MongoDb from 'mongodb'
import { getUsers } from '../db/database.js'
const ObjectID = MongoDb.ObjectId

export async function findByUsername(username){
    return getUsers().find({ username }).next().then(mapOptionalUser) //mapOptionalUser = 함수 및 콜백
}

export async function findById(id) {
    return getUsers().find({ _id: new ObjectID(id)})
    .next()
    .then(mapOptionalUser)
}

export async function createUser(user){
    return getUsers().insertOne(user).then((result) => result.insertedId.toString())
}

function mapOptionalUser(user){ //user를 받아서
    return user ? { ...user, id: user._id.toString()} : user // user 의 값이 존재한다면 :왼쪽 값 리턴, 그게아니라면 그냥 오른쪽 리턴
}