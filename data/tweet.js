import { db } from '../db/database.js'

const SELECT_JOIN = 'SELECT tw.id, u.username, u.name, u.url, tw.userId, tw.text, tw.createdAt FROM users as u JOIN tweets as tw ON u.id =tw.userId '

const ORDER_DESC = 'ORDER BY tw.createdAt DESC'



// 모든 트윗을 리턴 
export async function getAll(){
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0])
}

// 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return db.execute(`${SELECT_JOIN} WHERE u.username=? ${ORDER_DESC}`,[username])
        .then((result) => result[0])
}
// 글 번호에 대한 트윗을 리턴
export async function getById(id){
    return db.execute(`${SELECT_JOIN} WHERE tw.id = ?`,[id]).then((result) => result[0][0])
}


// 생성
export async function create(text, userId) {
    return db.execute('INSERT INTO tweets (userId, text, createdAt) VALUES (?, ?, ?)',
        [userId, text, new Date()]
    ).then((result) => getById(result[0].insertId))
}

// 수정
export async function update(id, text) {
    return db.execute('UPDATE tweets SET text=? WHERE id=?',{text, id})
    .then(() => getById(id))
}

// 삭제
export async function remove(id){
    return db.execute('DELETE FROM tweets WHERE id=?',{id})
}