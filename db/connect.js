const mongoose = require('mongoose')

let studentSchema = mongoose.Schema({
  name: String,
  age: Number,
  dept: String,
  doj: String
})

module.exports = mongoose.model('Student', studentSchema)