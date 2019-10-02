const mongoose = require('mongoose')
const Schema = mongoose.Schema

let WPchema = new Schema({
  name: { type: String, required: true },
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
const WarProg = mongoose.model('WP', WPchema)

module.exports = WarProg
