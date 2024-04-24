const express = require("express")
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var config = require('../config/jwtconfig')
var saltRounds = 10

// post the sign up data and create new employee in db

router.post("/signup", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase() })
        if (user) {
            return res.status(400).json({
                status: false,
                message: "Email already exits"
            })
        }
        //hash the password before saving into database
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,  
        }
        const adduser = new User(data)
        await adduser.save()

        console.log("user", adduser)
        return res.status(200).send({
            status: true,
            message: "Registered successfull",
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(
            {
                status: false,
                message: error.message
            }
        )
    }

})

//post the sign up data and login
router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({
            email: email.toLowerCase()
        })

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "No account found"
            })
        }
        const match = await bcrypt.compare(req.body.password, User.password)

        if (!match) {
            return res.status(400).json({
                message: "Invalid Password",
                status: false
            });
        }

        let token = jwt.sign({ id: user._id, name: user.name }, config.usersecretKey, {
            algorithm: config.algorithm,
            expiresIn: '7d'
        });

        const updateData = await User.findOneAndUpdate({ '_id': user._id }, { 'remember_token': token });
        console.log("user update data", updateData)
        const findUser = await User.findOne({ '_id': user._id }, { name: 1, email: 1 })

        return res.status(200).json({
            message: "Login Successfull",
            jwttoken: token,
            data: findUser,
            status: true
        });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

})

module.exports = router;