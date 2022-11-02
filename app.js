const express = require('express')
const mongoose = require('mongoose')
const studentModel = require('./db/connect')
const app = express()

let dbUrl = ' ' // Insert database url here

mongoose.connect(dbUrl)
  .then(res => console.log("Connected to db"))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/', async (req, res) => {
  let students = await studentModel.find({})
  res.send(students)
})

app.get('/student/', async (req, res) => {
  let student = await studentModel.findOne({ _id: req.query.id })
  res.send(student)
})

app.post('/', (req, res) => {
  console.log(req.body)
  let newStudent = new studentModel(req.body)
  newStudent.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Student Created");
    }
  })
  res.send('Student created')
})

app.put('/', async (req, res) => {
  let student = await studentModel.findOne({ _id: req.query.id })
  await student.updateOne(req.body)
  res.send('Student updated')
})

app.delete('/', async (req, res) => {
  await studentModel.remove({ _id: req.query.id })
  res.send('Student deleted')
})

app.listen(2121, console.log("Server is running"))
