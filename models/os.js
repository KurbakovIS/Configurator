const mongoose = require('mongoose')
const Schema = mongoose.Schema

let OSSchema = new Schema({
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const OpSys = mongoose.model('OpSys', OSSchema)

module.exports = OpSys
