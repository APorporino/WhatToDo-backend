const express = require('express')
const Project = require('../models/project.js')
const Backlog = require('../models/backlog.js')
const auth = require('../middleware/auth.js')

const router = new express.Router()

//This will create a project and assign the authenticated user as the first admin
//It will generate an empty backlog
router.post('/project', auth, async (req,res)=>{
    const admin = req.user._id
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        members: [admin],
        admins: [admin]
    });
    const backlog = new Backlog({
        project: project._id
    })
    project.backlog = backlog._id
    try{
        await project.save()
        await backlog.save()
        res.status(201).send(project)
    }catch(e){
        res.status(404).send({Error: e.message})
    }
})

router.delete('/project', auth, async (req,res)=>{
    try{
        const project = await Project.findById(req.body.project_id)
        if (!project){
            throw new Error("That project does not exist")
        }
        if (!project.admins.includes(req.user._id)){
            throw new Error("You must be an admin to add someone to the project")
        }
        project.remove()
        res.status(200).send(project)
    }catch(e){
        res.status(400).send({Error: e.message})
    }
})

//This route will add a user to the project as a member. Only admins can do this
//must pass body with project_id of project and user_id of user to be added
router.patch('/project', auth, async (req,res)=>{
    
    const project = await Project.findById(req.body.project_id)
    if (!project.admins.includes(req.user._id)){
        throw new Error("You must be an admin to add someone to the project")
    }
    try{
        if (project.members.includes(req.user_id)){
            throw new Error("This user is already a member of this project")
        }
        project.members.push(req.body.user_id)
        await project.save()
        res.status(200).send(project)
    }catch(e){
        res.status(400).send({Error: e.message})
    }
})

//this route will allow the admin of a project to make another user an admin
router.patch('/project/addAdmin', auth, async (req, res)=>{
    try {
        const project = await Project.findById(req.body.project_id)
        if (!project.admins.includes(req.user._id)){
            throw new Error("You must be an admin to make someone else an admin")
        }
        project.admins.push(req.body.user_id)
        await project.save()
        res.status(200).send(project)
    }catch(e){
        res.status(400).send({Error: e.message})
    }
    
})

router.get('/projectTasks', auth, async (req,res)=>{
    try {
        const project = await Project.findById(req.body.project_id)
        const backlog = await Backlog.findById(project.backlog)
        const tasks = await backlog.getAllTasks()
        res.send(tasks)

    }catch(e){
        res.status(400).send({Error: e.message})
    }
})

module.exports = router