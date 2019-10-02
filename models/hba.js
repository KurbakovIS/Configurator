const mongoose = require('mongoose')
const Schema = mongoose.Schema

let HBASchema = new Schema({
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const Hba = mongoose.model('HBA', HBASchema)

module.exports = Hba
