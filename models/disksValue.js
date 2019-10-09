const mongoose = require('mongoose')
const Schema = mongoose.Schema

let DISKVALUESchema = new Schema({
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const DiskValue = mongoose.model('DiskValue', DISKVALUESchema)

module.exports = DiskValue
