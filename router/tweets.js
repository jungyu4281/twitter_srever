import express from 'express'

const router = express.Router()

let tweets =[
    {
        id:'1',
        name:'김사과',
        username:'apple',
        text: '안녕하세요',
        createdAt: Date.now().toString(),
        url:'https://img.freepik.com/premium-photo/young-asian-man-her-clean-face-with-fresh-healthy-skin-ai-generated_145713-6656.jpg'
    },

    {
        id:'2',
        name:'반하나',
        username:'banana',
        text: '반갑습니다',
        createdAt: Date.now().toString(),
        url:'https://cdn.goenhance.ai/user/2024/07/12/6df8872f-c15e-442f-a4df-caa520c34c77_1.jpg'
    },

    {
        id:'3',
        name:'오렌지',
        username:'orange',
        text: '첫 트윗!',
        createdAt: Date.now().toString(),
        url:'https://image.fmkorea.com/files/attach/new3/20230304/486616/5188209953/5548553027/c61967d378b4197162c61fada55ac76d.jpg'
    }
]



// 해당 아이디에 대한 트윗 가져오기
// GET 방식 (정보 조회)
// http://127.0.0.1:8080/tweets?username=:username
router.get('/',(req,res,next)=>{
    const username = req.query.username
    const data = username ? tweets.filter((tweet) => tweet.username == username) : tweets //  삼합 연산? => 조건 ? true : false
    res.status(200).json(data)
})


// 글번호에 대한 트윗 가져오기
// GET 방식 (정보 조회)
// http://127.0.0.1:8080/tweets/:id
router.get('/:id',(req,res,next)=>{
    const id = req.params.id
    const tweet = tweets.find((tweet)=> tweet.id === id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
})


// 트윗하기
// POST 방식 (글을 보내는것이기 때문에)
// http://127.0.0.1:8080/tweets
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/', (req, res, next)=>{
    const { username, name, text } =req.body
    const tweet = {
        id:'4',
        username: username,
        name: name,
        text: text,
        createdAt: Date.now().toString(),
    }
    tweets = [tweet, ...tweets]
    res.status(201).json(tweets)
})

// 트윗 수정하기
// PUT (수정하기 위해)
// http://127.0.0.1:8080/tweets/:id
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.put('/:id', (req, res, next)=>{
    const id = req.params.id
    const text = req.body.text
    const tweet = tweets.find((tweet) => tweet.id ===id)
    if(tweet){
        tweet.text = text
        res.status(201).json(tweet)
    }else{
        res.status(404).json({message:`${id}의 트윗이 없습니다.`})
    }
})


// 트윗 삭제하기
// DELETE (삭제하기 위해)
// http://127.0.0.1:8080/tweets/:id
router.delete('/:id', (req, res, next)=>{
    const id = req.params.id
    tweets = tweets.filter((tweet) => tweet.id !== id)
    res.status(204)
})





export default router