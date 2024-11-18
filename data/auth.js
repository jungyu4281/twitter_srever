import { sequelize } from '../db/database.js'
import SQ from 'sequelize'

const DataTypes = SQ.DataTypes

export const User = sequelize.define( // user뒤에 자동으로 복수형이 들어가므로 없애준다
    'user',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull : true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        url: DataTypes.TEXT
    },
    { timestamps: false } // 모든 컬럼이 자동으로 들어가기에, timestamps를 비활성화 시킨다
)


export async function findByUsername(username){
    return User.findOne({ where: { username }})
}

export async function findById(id){
    return User.findByPk(id)
}

export async function createUser(user) {
    return User.create(user).then((data) => data.dataValues.id)
}
