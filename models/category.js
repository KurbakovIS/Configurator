const mongoose = require('mongoose')
const Schema = mongoose.Schema

let CategorySchema = new Schema({
  group: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  column: [
    {
      name: { type: String, required: true },
      key: { type: String, required: true },
      image: { type: String },
      description: { type: String, required: true },
      param: { type: Array, required: true }
    }
  ]
})
const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
