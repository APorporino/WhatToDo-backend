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
const auth = require('./middleware/auth.js')

const app = express();

const port = process.env.PORT || 3000

//define paths for express config
const STATIC_DIR = path.join(__dirname,"../static")
const TEMPLATES_DIR = path.join(__dirname,"../templates/views")
const PARTIALS_DIR = path.join(__dirname,"../templates/partials")

//handle bar engines and views engine
app.set('view engine', 'hbs')
app.set('views',TEMPLATES_DIR)
hbs.registerPartials(PARTIALS_DIR)

//set up static dir to serve
app.use(express.static(STATIC_DIR))
//automatically parses incoming json
app.use(express.json())



app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log("Listening on port" + port)
})