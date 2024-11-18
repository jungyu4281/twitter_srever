import jwt from 'jsonwebtoken'
import * as authRepository from '../data/auth.js'
import { config } from '../config.js'

const AUTH_ERROR = {message: '인증에러'}

export const isAuth = async(req, res, next) => {
    const authHeader = req.get('Authorization')
    console.log(authHeader)

    if(!(authHeader && authHeader.startsWith('Bearer '))){
        console.log('헤더 에러')
        return res.status(401).json(AUTH_ERROR)
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token, config.jwt.secretKey, async (error, decoded) => {
            if (error) {
                console.log('토큰 에러')
                return res.status(401).json(AUTH_ERROR)
            }
            const user = await authRepository.findById(decoded.id)
            if (!user) {
                console.log('아이디 없음')
                return res.status(401).json(AUTH_ERROR)
            }
            req.userId = user.id
            next()
        }
    )
}

