// IMPORTING ALL THE DATABASE COLLECTIONS
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
var config = require('../config/jwtconfig')
const Student = require("../models/student");

const verifytoken = require("../middleware/verifytokenuser")


// CREATE STUDENT FROM FORM DATA WITH ALL CHECKS AND SAVE IT TO DATABASE
router.post("/create",verifytoken, async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            collegename: req.body.collegename,
            clgplacemnt: req.body.clgplacemnt,
            mobilenumber: req.body.momobilenumber,
            email: req.body.email,
            batch: req.body.batch,
            dsascore: req.body.dsascore,
            webdevscore: req.body.webdevscore,
            reactscore: req.bodyreactscore,
        }
        console.log(data)
        const studentData = new Student(data)
        const savedData = await studentData.save()

        const findSavedStudent = await Student.findById(savedData._id)
        console.log("saved", savedData)
        res.status(200).json({
            status: true,
            message: "Product Added",
            findSavedStudent
        })
    }
    catch (error) {
        res.status(500).json(
            {
                status: false,
                message: error.message
            })
    }
})

// VIEW STUDENT DETAILS 
router.get('/show/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const findStudent = await Student.findById(req.params.id)
        return res.status(200).json({
            status: true,
            message: 'Data found',
            data: findStudent
        })
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
})

//UPDATE STUDENT
router.post('/update', async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            collegename: req.body.collegename,
            clgplacemnt: req.body.clgplacemnt,
            mobilenumber: req.body.momobilenumber,
            email: req.body.email,
            batch: req.body.batch,
            dsascore: req.body.dsascore,
            webdevscore: req.body.webdevscore,
            reactscore: req.bodyreactscore,
        }
        console.log(req.body)

        const saveData = await Student.findOneAndUpdate({ '_id': req.body.updateId }, data)
        return res.status(200).json({
            status: true,
            message: 'Student Updated',
            saveData
        })
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
})

//DELETE STUDENT
router.get('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        let student = await Student.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            status: true,
            message: 'Student Deleted',

        })
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
})

module.exports = router;