import express from 'express'
import * as tweetController from '../controller/tweet.js'
import { body } from 'express-validator'
import { validate } from '../middleware/validator.js'
import { isAuth } from '../middleware/auth.js'

const router = express.Router()

const validateTweet =[
    body('text').trim().isLength({min:3}).withMessage('최소 3자이상 입력'),validate
]



// 해당 아이디에 대한 트윗 가져오기
// GET 방식 (정보 조회)
router.get('/', isAuth, tweetController.getTweets)


// 글번호에 대한 트윗 가져오기
// GET 방식 (정보 조회)
router.get('/:id', isAuth, tweetController.getTweet)


// 트윗하기
// POST 방식 (글을 보내는것이기 때문에)
router.post('/',  validateTweet, isAuth,tweetController.createTweet)

// 트윗 수정하기
// PUT (수정하기 위해)
router.put('/:id', validateTweet, isAuth,tweetController.updateTweet)


// 트윗 삭제하기
// DELETE (삭제하기 위해)
router.delete('/:id', isAuth, tweetController.deleteTweet)





export default router