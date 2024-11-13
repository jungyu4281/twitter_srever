let users = [
    {
        id:'1',
        username: 'apple',
        password: '$2b$10$YkZDI6DJlkbq3k4tJbfqFOxI.FlwZouvXpwFElz2XxlLjLKk9lHQ2',
        name:'김사과',
        email:'apple@apple.com',
        url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0lv1zZ9X7eHQXWg-KlqrArVHTZ1_6cR8grA&s'
    },
    {
        id:'2',
        username: 'banana',
        password: '$2b$10$Gce4R6uhrnrFi7.6b9rAb.C/ydObHRld6pYmjomZsy13D4fz.ZoXa',
        name:'반하나',
        email:'banana@banana.com',
        url:'https://cdn.prod.website-files.com/63da3362f67ed6f71c9489c1/63f48a7d89d93e62503d03d6_Meta-img2.jpg'
    },
    {
        id:'3',
        username: 'orange',
        password: '$2b$10$IxQmaIsLuxAeRDdFmmFCBumWmONym5LOlMF3nj0uxwAGv/YSQcrmi',
        name:'오렌지',
        email:'orange@orange.com',
        url:'https://cdn.pixabay.com/photo/2023/02/22/21/39/ai-generated-7807434_1280.jpg'
    },
]

// 회원가입
export async function createUser(username,password,name,email){
    const user = {
        id:'4',
        username,
        password,
        name,
        email,
        url:'https://cdn.pixabay.com/photo/2023/02/22/21/39/ai-generated-7807434_1280.jpg'
    }
    users = [user, ...users]
    return user
}


// 로그인
export async function findByUsername(username){
    const user = users.find((user)=> user.username === username)
    return user
}

export async function findById(id){
    return users.find((user) => user.id === id)
}