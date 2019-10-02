const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TRANSchema = new Schema({
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const transciever = mongoose.model('transciever', TRANSchema)

module.exports = transciever
