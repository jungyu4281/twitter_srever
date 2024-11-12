
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
        url:'https://image.fmkorea.com/files/attach/new3/20230304/486616/5188209953/5548553027/c61967d378b4197162c61fada55ac76d.jpg',
    }
]

// 모든 트윗을 리턴
export async function getAll(){
    return tweets
}
// 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return tweets.filter((tweet)=>tweet.username == username)
}
// 글 번호에 대한 트윗을 리턴
export async function getById(id){
    return tweets.find((tweet)=>tweet.id===id)
}

// 생성
export async function create(username, name, text) {
    const tweet = {
        id: (tweets.length + 1).toString(), 
        username,
        name,
        text,
        createdAt: Date.now().toString(),
    }
    tweets = [tweet, ...tweets]
    return tweet
}

// 수정
export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id)
    if (tweet) {
        tweet.text = text
    }
    return tweet
    
}

// 삭제
export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !==id)
}