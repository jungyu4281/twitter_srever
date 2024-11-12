import * as tweetRepository from '../data/tweet.js'

// 모든 트윗을 가져오는 함수
export async function getTweets(req,res,next){
    const username = req.query.username
    const data = await (username ? tweetRepository.getAllByUsername(username) : 
    tweetRepository.getAll())
    res.status(200).json(data)
} 



// 글번호에 대한 트윗 가져오기
// GET 방식 (정보 조회)
export async function getTweet(req,res){
    const id = req.params.id
    const tweet = await tweetRepository.getById(id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}


// 트윗하기
// POST 방식 (글을 보내는것이기 때문에)
// http://127.0.0.1:8080/tweets
export async function createTweet(req,res,next){
    const { username, name, text } =req.body
    const tweet = await tweetRepository.create(username,name,text)
    res.status(201).json(tweet)
}


// 트윗 수정하기
// PUT (수정하기 위해)
export async function updateTweet(req, res) {
    const id = req.params.id
    const text = req.body.text
    const tweet = await tweetRepository.update(id, text)
    if (tweet) {
        res.status(200).json(tweet)
    } else {
        res.status(404).json({ message: `${id}의 트윗이 없습니다.` })
    }
}


// 트윗 삭제하기
// DELETE (삭제하기 위해)
export async function deleteTweet(req, res, next){
    const id = req.params.id 
    await tweetRepository.remove(id)
    res.sendStatus(204)
}