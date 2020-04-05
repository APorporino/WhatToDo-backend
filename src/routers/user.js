const express = require('express')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')

const router = new express.Router()

//create a new user
router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthenticationToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

//login a user
router.post('/users/login', async (req,res)=>{
    try{
        //newly created function in schema
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthenticationToken()
        res.send({user,token})
    }catch(error){
        console.log(error.message)
        res.status(400).send({error: error.message})
    }
})

//logout
router.post('/users/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=> token.token !== req.token)

        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send()
    }
})

//get my profile
router.get('/users/me', auth, async (req,res)=>{
    //req.user is set in auth function in middleware
    res.send(req.user)
})

//old method used to get a specific user
//recall the :id way used to pass params
// router.get('/users/:id', auth, async (req,res)=>{
//     //note :variable is how to pass request parameters 
//     try {
//         const user = await User.findById(req.params.id)
//         if (user){
//             return res.send(user)
//         }
//         res.status(404).send()
//     }catch(e){
//         res.status(400).send()
//     }
// })

//update any fields of a user you want
router.patch('/users/me', auth, async (req, res)=>{
    const updateFields = Object.keys(req.body)
    try{
        updateFields.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()

        if (req.user){
            return res.send(req.user)
        }
        res.status(404).send()
    }catch(e){
        res.status(400).send()
    }
})

//delete your account
router.delete('/users/me', auth, async (req,res)=>{
    try{
        await req.user.remove()
        //const user = await User.findByIdAndDelete(req.user._id)
        return res.send(req.user)
        
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router
