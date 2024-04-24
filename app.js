const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require ("body-parser")
require('dotenv').config()
const PORT = process.env.PORT || 8001

const app = express()

var cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

const connection = mongoose.connect(process.env.MONGO_URI)
const conn = mongoose.connection
conn.on('open', () => {
    console.log('Database connected')
});

app.use(require("./controllers/comapnyController"))
app.use(require("./controllers/studentController"))
app.use(require("./controllers/userController"))

app.listen(PORT, () =>
    console.log(`app is listening on ${PORT}`)
)