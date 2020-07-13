const supertest = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/user.js')
const { user1, setUpDatabase } = require('./fixures/db.js')


beforeEach(setUpDatabase);

afterEach(() => {
});

test('Signup a new user', async () => {
    const response = await supertest(app).post('/users').send({
        name: 'Tony',
        email: 'm@gmail.com',
        password: 'pass8888',
        age: 20
    }).expect(201)

    //assert that user is persisted to DB
    const user = await User.findById(response.body.user._id)
    expect(user).toMatchObject({
        name: 'Tony',
        email: 'm@gmail.com',
        age: 20
    })
})

test('Login an existing user', async ()=>{
    const response = await supertest(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    }).expect(200)

    //assert that a new token was created
    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Login an existing user with bad credentials', async ()=>{
    await supertest(app).post('/users/login').send({
        email: 'm@gmail.com',
        password: 'pass8888',
    }).expect(400)
})

test('Get user profile', async ()=>{
    await supertest(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('User profile but is unauthorized', async ()=>{
    await supertest(app)
        .get('/users/me')
        .send()
        .expect(401)
})

//need cascade delete
// test('Delete account', async ()=>{
//     const response = await supertest(app)
//         .delete('/users/me')
//         .set('Authorization', `Bearer ${user1.tokens[0].token}`)
//         .send()
//         .expect(200)
//     //assert that user is removed from DB
//     const user = await User.findById(response.body._id)
//     expect(user).toBeNull()
// })

// test('Delete account but is unauthorized', async ()=>{
//     await supertest(app)
//         .delete('/users/me')
//         .send()
//         .expect(401)
// })

test('Upload avatar image', async()=>{
    //.attach('form_file','file')
    await supertest(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatar','tests/fixures/image1.png')
        .expect(200)
    
    const user = await User.findById(user1._id)
    expect(user.avatar).toEqual(expect.any(Buffer))

})

test('Update user field', async()=>{
    await supertest(app)
        .patch('/users/me')
        .send({
            name: 'BINGO',
            password: 'pass0000',
            age: 21
        })
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .expect(200)

    const user = await User.findById(user1._id)
    expect(user.name).toBe('BINGO')
    expect(user.age).toBe(21)
})