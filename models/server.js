const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ServersSchema = new Schema({
  id: Number,
  name: { type: String, required: true },
  components: [
    {
      name: { type: String, required: true },
      category: { type: String, required: true },
      attributes: [
        {
          category: String,
          parent_category: String,
          name: String,
          value: String
        }]
    }
  ]
})

const Server = mongoose.model('Server', ServersSchema)

module.exports = Server
