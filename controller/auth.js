import * as authRepository from '../data/auth.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey = 'asdfqwer1234!@#$'
const bcryptSaltRounds = 10         //파일로 뺄 값
const jwtExpriesInDays = '2d'       //파일로 뺄 값

async function createJwtToken(id) {
    const token = jwt.sign({id}, secretKey, { expiresIn: jwtExpriesInDays }) 
    return token   
}


// signup
export async function signup(req, res, next) {
    const { username, password, name, email } = req.body
    //회원 중복 체크
    const found = await authRepository.findByUsername(username)
    if(found){
        return res.status(409).json({message: `${username}이 이미 있습니다`})
    }
    // const user = await authRepository.createUser(username, password, name, email)
    const hashed = bcrypt.hashSync(password, bcryptSaltRounds)
    const users = await authRepository.createUser(username, hashed, name, email)
    const token = await createJwtToken(users.id)
    res.status(201).json({token, username})
}


// login
export async function login(req, res, next){
    const {username, password} = req.body
    const user = await authRepository.findByUsername(username)
    if(!user){
        return res.status(401).json(`${username} 아이디를 찾을 수 없음`)
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword){
        return res.status(401).json({message: `아이디 또는 비밀번호 확인`})
    }
    const token = await createJwtToken(user.id)
    res.status(200).json({ token, username })
}

export async function verify(req,res,next) {
    const token = req.headers['Token']
    if(token){
        res.status(200).json(token)
    }
}

export async function me(req, res, next){
    const user = await authRepository.findById(req.userId)
    if(!user){
        return res.status(404).json({message: '일치하는 사용자가 없음'})
    }
    res.status(200).json({token:req.token, username: user.username})
}