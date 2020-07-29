const mongoose = require('mongoose')
const validator = require('validator')
const Story = require('./story')

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
backlogSchema.virtual('stories', {
    ref: 'Story',
    localField: '_id',
    foreignField: 'backlog',
    justOne: false,
})


backlogSchema.methods.getAllTasks = async function(){
    var tasks = []
    const stories = await mongoose.model('Story').find({backlog: this.id})
    
    for (const story of stories){
        await story.populate({
            path: 'tasks',
        }).execPopulate()
        story.tasks.forEach(task=>{
            tasks.push(task)
        })
    }
    return tasks
}

const Backlog = mongoose.model("Backlog", backlogSchema)

module.exports = Backlog