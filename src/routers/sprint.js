const express = require('express')
const Sprint = require('../models/sprint.js')
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')

const router = new express.Router()


router.post('/sprint', auth, async (req, res)=>{
    const sprint = new Sprint({
        ...req.body
    })

    try{
        await sprint.save()
        res.status(201).send(sprint)
    }catch(e){
        res.status(404).send({Error: e.message})
    }
})

router.post('/sprint/addTask', auth, async (req, res) => {
    try {
        
        const task = await Task.findById(req.body.taskId)
        if (!task){
            throw new Error("Cannot find that task")
        }
        task.sprint = req.body.sprintId
        await task.save()
        res.status(201).send(task)

    }catch(e){
        res.status(404).send({Error: e.message})
    }
    

})

module.exports = router