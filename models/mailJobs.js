const mongoose = require('mongoose')
const Schema = mongoose.Schema

let mailSchema = new Schema({
  mail: { type: String },
  theme: { type: String },
  orders: [{
    name: { type: String }
  }]
})

const MailJob = mongoose.model('mailjob', mailSchema)

module.exports = MailJob
