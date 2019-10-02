const mongoose = require('mongoose')
const Schema = mongoose.Schema

let companySchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  active: { type: Boolean, default: true },
  idManager: { type: Schema.Types.ObjectId, ref: 'Manager' },
  Client_ids: [{ type: Schema.Types.ObjectId, ref: 'Client' }]
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company
