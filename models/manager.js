const mongoose = require('mongoose')
const Schema = mongoose.Schema

let managerSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  idCompany: { type: Schema.Types.ObjectId, ref: 'Company' },
  Client_ids: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  Order_ids: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager
