const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//To get the ouput list of categories
router.get(`/`, async (req, res) =>{
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

//To get all the input to creat new categories
router.post('/', async (req, res) =>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password, 10),//We have hashed the passowrd incase our database becomes vulnerable and omeone without athourity would be able to see our data
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('The user cannot be created')

    res.send(user);
})

module.exports =router;