const mongoose = require('mongoose')
const Schema = mongoose.Schema

let DisksSchema = new Schema({
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
const Disk = mongoose.model('Disk', DisksSchema)

module.exports = Disk
