// IMPORTING THE ALL THE DATABASES COLLECTIONS
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
var config = require('../config/jwtconfig')

const User = require("../models/user");
const Student = require("../models/student");
const Company = require("../models/company");

const verifytoken = require("../middleware/verifytokenuser")

// HOMEPAGE FOR COMPANY PORTAL
router.get('/list', verifytoken, async(req,res)=>{
    try{
        const findStudent = await Student.find()
        return res.status(200).json({
            status:true,
            message:'Data found',
            data:findStudent
        })
    }
    catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
})

// ALLOCATE THE INTERVIEW TO STUDENTS I.E FORM IS OPEN
router.post('/allocateinterview',verifytoken,async(req,res)=>{
    try {
      let students = await Student.find({});
      let batch = await Student.find({});

      batch_array=[];
      for(let st of batch){
        batch_array.push(st.batch);
      }
      batch_array = [...new Set(batch_array)];

      return res.status(200).json({
        status:200,
        data:students,
        batch_array
      })

    } catch (err) {
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
})


module.exports = router;