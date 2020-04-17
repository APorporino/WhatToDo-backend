const mongoose = require('mongoose')
const validator = require('validator')

const backlogSchema = new mongoose.Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    }

},{
    timestamps: true
})

//virtual list of stories
backlogSchema.virtual('stories',{
    ref: 'Story',
    localField: '_id',
    foreignField: 'backlog',
    justOne: false,
})

const Backlog = mongoose.model("Backlog", backlogSchema)

module.exports = Backlog