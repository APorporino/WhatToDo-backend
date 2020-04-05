const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Task = require('./task.js')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate(pass){
            if (pass.length < 7){
                throw new Error("Must be 7 characters long")
            }else if (validator.contains(pass,"password")){
                throw new Error("Password cannot contain password")
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(email){
            if (!validator.isEmail(email)){
                throw new Error("Must use a valid email adress")
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(age){
            if (age < 18){
                throw new Error("User must be older than 18")
            }
        }

    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
},{
    timestamps: true,
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}
userSchema.methods.generateAuthenticationToken = async function(){

    const token = jwt.sign({ _id: this._id.toString()}, "thisismysecret")
    this.tokens.push({token})
    await this.save()
    return token
}

//findByCredentials function for logging in
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error("User with that email does not exist")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch){
        throw new Error("Password is incorrect for this email")
    }
    return user
}

//hash password before saving
userSchema.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

//deletes task of user before deleting user
userSchema.pre('remove', async function(next){
    await Task.deleteMany({owner: this._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User