const mongoose = require('mongoose')
const validator = require('validator')

const storySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(name){
            if (name.length > 50){
                throw new Error("Must be less than 50 characters")
            }
        }
    },

    description: {
        type: String,
        required: true,
        validate(description){
            if (description.length > 200){
                throw new Error("Must be less than 200 characters")
            }
        }
    },

    backlog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Backlog'
    },

    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Sprint'
    }

},{
    timestamps: true
})

//virtual list of tasks
storySchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'story',
    justOne: false,
})

const Story = mongoose.model("Story", storySchema)

module.exports = Story