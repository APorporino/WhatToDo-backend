const supertest = require('supertest')
const app = require('../src/app.js')
const Task = require('../src/models/task.js')
const { task1, task2, task3, user1ID, user1, user2, setUpDatabase } = require('./fixures/db.js')

beforeEach(setUpDatabase);

test('Should create a task', async()=>{
    const response = await supertest(app).post('/tasks')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .send({
            description: "play Bass"
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.description).toBe("play Bass")
})

test('Get all task for user', async()=>{
    const response = await supertest(app).get('/tasks')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Delete a task', async()=>{
    const response = await supertest(app).delete(`/tasks/${task1._id}`)
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .expect(200)

    const task = await Task.findById(task1._id)
    expect(task).toBeNull()
})

test('Delete a task unauthorized user', async()=>{
    const response = await supertest(app).delete(`/tasks/${task3._id}`)
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .expect(404)

    const task = await Task.findById(task1._id)
    expect(task).not.toBeNull()
})