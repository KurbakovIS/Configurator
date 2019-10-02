const mongoose = require('mongoose')
const Schema = mongoose.Schema

let RAIDSchema = new Schema({
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const RAIDController = mongoose.model('RAIDController', RAIDSchema)

module.exports = RAIDController
