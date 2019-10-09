const mongoose = require('mongoose')
const Schema = mongoose.Schema

let CounterSchema = new Schema({
  name: { type: String, required: true },
  sequence_value: { type: Number }
})
const Counter = mongoose.model('Countes', CounterSchema)

module.exports = Counter
