const mongoose = require('mongoose')
const Schema = mongoose.Schema

let clientsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true },
  work_email: { type: String },
  FirstName: { type: String, required: true },
  SecondName: { type: String },
  LastName: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  phone: { type: Number, required: true },
  mobile: { type: Number },
  address: { type: String },
  createdOn: { type: Date, default: Date.now },
  idCompany: { type: Schema.Types.ObjectId, ref: 'Company' },
  idManager: { type: Schema.Types.ObjectId, ref: 'Manager' },
  Order_ids: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

const Client = mongoose.model('Client', clientsSchema)

module.exports = Client
