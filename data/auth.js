let users = [
    {
        id:'1',
        username: 'apple',
        password: '1111',
        name:'김사과',
        email:'apple@apple.com',
        url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0lv1zZ9X7eHQXWg-KlqrArVHTZ1_6cR8grA&s'
    },
    {
        id:'2',
        username: 'banana',
        password: '2222',
        name:'반하나',
        email:'banana@banana.com',
        url:'https://cdn.prod.website-files.com/63da3362f67ed6f71c9489c1/63f48a7d89d93e62503d03d6_Meta-img2.jpg'
    },
    {
        id:'3',
        username: 'orange',
        password: '3333',
        name:'오렌지',
        email:'orange@orange.com',
        url:'https://cdn.pixabay.com/photo/2023/02/22/21/39/ai-generated-7807434_1280.jpg'
    },
]

export async function createUser(username,password,name,email){
    const user = {
        id:'4',
        username:username,
        password:password,
        name:name,
        email:email,
        url:'https://cdn.pixabay.com/photo/2023/02/22/21/39/ai-generated-7807434_1280.jpg'
    }
    users = [user, ...users]
    return user
}

export async function login(username){
    const user = users.find((user)=> user.username === username)
    return user
}