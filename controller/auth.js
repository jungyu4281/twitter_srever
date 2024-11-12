import * as authRepository from '../data/auth.js'

// signup
export async function signup(req, res, next) {
    const { username, password, name, email } = req.body
    const user = await authRepository.createUser(username, password, name, email)
    if (user) {
        res.status(201).json(user)
    }
}


// login
export async function login(req,res,next){
    const{ username, password } = req.body
    const user = await authRepository.login(username)
    if(user){
        res.status(201).json(`${username} 로그인 완료`)
    }else{
        res.status(404).json({message: `${username}님 아이디 또는 비밀번호를 확인하세요`})
    }
}