const mongoose = require('mongoose')
const validator = require('validator')

const sprintSchema = new mongoose.Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },

    startDate: {
        type: Date,
        required: true,
        default: Date.now()
    },

    endDate: {
        type: Date,
        required: true,
        default: Date(Date.now() + 12096e5)
    }

},{
    timestamps: true
})

//list of stories for a sprint
sprintSchema.virtual('stories', {
    ref: 'Story',
    localField: '_id',
    foreignField: 'sprint',
    justOne: false,
})

const Sprint = mongoose.model("Sprint", sprintSchema)

module.exports = Sprint