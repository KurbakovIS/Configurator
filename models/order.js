const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ordersSchema = new Schema({
  order_id: { type: String },
  order_status_id: { type: Schema.Types.ObjectId, ref: 'orderStatus' },
  order_status: { type: String },
  order_date: { type: Date, default: Date.now },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  customer: {
    id: { type: Schema.Types.ObjectId, ref: 'Client' },
    company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  tech_customer: {
    fullName: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  manager: {
    id: { type: Schema.Types.ObjectId, ref: 'Manager' },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  address_ship: { type: String },
  date_ship: { type: Date, default: Date.now },
  comments: { type: String },
  position: [
    {
      position_id: { type: String },
      server_id: { type: Schema.Types.ObjectId, ref: 'Server' },
      user_id: { type: Schema.Types.ObjectId, ref: 'User' },
      server_date: { type: Date, default: Date.now },
      server_name: { type: String },
      server_corp: { type: String },
      server_type: { type: String },
      server_mp: { type: String },
      attributes: [
        {
          category: { type: String },
          name: { type: String },
          value: { type: String },
          count: { type: Number }
        }
      ],
      disks: [
        {
          form: { type: String },
          interface: { type: String },
          value: { type: String },
          count: { type: Number }
        }
      ],
      count_position: { type: Number },
      comments_position: { type: String }
    }
  ]
})
const Order = mongoose.model('Order', ordersSchema)

module.exports = Order
