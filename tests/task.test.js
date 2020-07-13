const supertest = require('supertest')
const app = require('../src/app.js')
const Task = require('../src/models/task.js')
const { story, user1, user2, setUpDatabase } = require('./fixures/db.js')

beforeEach(setUpDatabase);

test('Should create a task', async()=>{
    const response = await supertest(app).post('/tasks')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .send({
            description: "play Bass",
            story: story._id
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.description).toBe("play Bass")
})
