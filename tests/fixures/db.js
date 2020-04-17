const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user.js')
const Task = require('../../src/models/task.js')
const Project = require('../../src/models/project.js')
const Backlog = require('../../src/models/backlog.js')
const Story = require('../../src/models/story.js')
const Sprint = require('../../src/models/sprint.js')

const user1ID = new mongoose.Types.ObjectId()
const user2ID = new mongoose.Types.ObjectId()
const backlogID = new mongoose.Types.ObjectId()
const projectID = new mongoose.Types.ObjectId()
const storyID = new mongoose.Types.ObjectId()

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

const project = {
    _id: projectID,
    name: "project1",
}

const backlog = {
    _id: backlogID,
    project: projectID
}

const story = {
    _id: storyID,
    name: "Story 1",
    description: "Test story",
    backlog: backlogID
}



const setUpDatabase = async ()=>{
    await User.deleteMany({})
    await Task.deleteMany({})
    await Project.deleteMany({})
    await Backlog.deleteMany({})
    await Sprint.deleteMany({})
    await Story.deleteMany({})


    await new Project(project).save()
    await new Backlog(backlog).save()
    await new Story(story).save()

    await new User(user1).save()
    await new User(user2).save()
}

module.exports = {
    story,
    user1,
    user2,
    setUpDatabase
}