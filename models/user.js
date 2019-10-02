const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: false },
  manager_id: { type: Schema.Types.ObjectId, ref: 'Manager', required: false }
})

module.exports = mongoose.model('User', User)
