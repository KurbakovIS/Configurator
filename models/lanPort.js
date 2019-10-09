const mongoose = require('mongoose')
const Schema = mongoose.Schema

let LANchema = new Schema({
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const LANPort = mongoose.model('LANPort', LANchema)

module.exports = LANPort
