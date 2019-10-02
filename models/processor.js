const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ProcessorsSchema = new Schema({
  id: Number,
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const Processor = mongoose.model('Processor', ProcessorsSchema)

module.exports = Processor
