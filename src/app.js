//-------core modules
const path = require("path")
//-------npm modules
const express = require('express')
const hbs = require('hbs')
//-------my modules
require('./db/mongoose.js')
const User = require('./models/user.js')
const Task = require('./models/task.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const projectRouter = require('./routers/project.js')
const storyRouter = require('./routers/story.js')
const sprintRouter = require('./routers/sprint.js')
const auth = require('./middleware/auth.js')

const app = express();

//automatically parses incoming json
app.use(express.json())


app.use(userRouter)
app.use(taskRouter)
app.use(projectRouter)
app.use(storyRouter)
app.use(sprintRouter)

module.exports = app