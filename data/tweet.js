
let tweets =[
    {
        id:'1',
        userId: '1',
        text: '안녕하세요',
        createdAt: Date.now().toString()
    },

    {
        id:'2',
        userId: '2',
        text: '반갑습니다',
        createdAt: Date.now().toString()
    },

    {
        id:'3',
        userId: '1',
        text: '첫 트윗!',
        createdAt: Date.now().toString()
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