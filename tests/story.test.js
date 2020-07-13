const supertest = require('supertest')
const app = require('../src/app.js')
const Story = require('../src/models/story.js')
const { backlog, user1, setUpDatabase } = require('./fixures/db.js')

beforeEach(setUpDatabase);

test('Make a story', async ()=>{
    const response = await supertest(app).post('/story')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .send({
            name: "Story1",
            description: "Story 1 is crazy",
            backlog: backlog._id
        })
        .expect(201)
    
    const story = await Story.findById(response.body._id)
    expect(story).not.toBe(null)
})