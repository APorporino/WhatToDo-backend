const mongoose = require('mongoose')
const validator = require('validator')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    dateEnded: {
        type: Date,
    },

    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],

    backlog: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Backlog'
    }

},{
    timestamps: true
})
//timestamps true will give us createdAt and updatedAt variables



const Project = mongoose.model('Project',projectSchema)

module.exports = Project