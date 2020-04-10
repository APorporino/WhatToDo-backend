const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user.js')
const Task = require('../../src/models/task.js')

const user1ID = new mongoose.Types.ObjectId()
const user2ID = new mongoose.Types.ObjectId()

const user1 = {
    _id: user1ID,
    name: "User1",
    email: "user1@test.com",
    password: "test12344",
    age: 18,
    tokens: [
        {
            token: jwt.sign({_id: user1ID}, process.env.JWT_SECRET)
        }
    ]
}
const user2 = {
    _id: user2ID,
    name: "User2",
    email: "user2@test.com",
    password: "test12344",
    age: 18,
    tokens: [
        {
            token: jwt.sign({_id: user2ID}, process.env.JWT_SECRET)
        }
    ]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Play guitar",
    owner: user1._id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Play drums",
    completed: true,
    owner: user1._id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Play bass",
    completed: true,
    owner: user2._id
}



const setUpDatabase = async ()=>{
    await User.deleteMany({})
    await Task.deleteMany({})
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}

module.exports = {
    user1ID,
    user1,
    user2,
    task1,
    task2,
    task3,
    setUpDatabase
}