const mongoose = require('mongoose')
const Schema = mongoose.Schema

let LANVALUEchema = new Schema({
  name: { type: String },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const LANPortValue = mongoose.model('LANPortValue', LANVALUEchema)

module.exports = LANPortValue
