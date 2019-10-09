const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    server_id: { type: Schema.Types.ObjectId, ref: 'Server' },
    server_date: { type: Date, required: true, default: Date.now },
    server_name: { type: String, required: true },
    server_corp: { type: String, required: true },
    server_type: { type: String, required: true },
    server_mp: { type: String, required: true },
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
)
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
