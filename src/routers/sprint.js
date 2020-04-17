const express = require('express')
const Sprint = require('../models/sprint.js')
const auth = require('../middleware/auth.js')

const router = new express.Router()


router.post('/sprint', auth, async (req, res)=>{
    const sprint = new Sprint({
        project: req.body.project
    })

    try{
        await sprint.save()
        res.status(201).send(sprint)
    }catch(e){
        res.status(404).send({Error: e.message})
    }
})

module.exports = router