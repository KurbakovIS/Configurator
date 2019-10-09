const mongoose = require('mongoose')
const Schema = mongoose.Schema

let StatusOrderSchema = new Schema({
  name: { type: String, required: true }
})
const OrderStatus = mongoose.model('orderStatus', StatusOrderSchema)

module.exports = OrderStatus
