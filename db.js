const mongoose = require('mongoose')
const Cfg = require('./Cfg')
mongoose.connect(Cfg.mongoURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connect success'))
  .catch((error) => console.log(error))
const db = {}
db.Servers = mongoose.model('Servers', Cfg.ServersSchema)
db.Processors = mongoose.model('Processors', Cfg.ProcessorsSchema)
db.Disks = mongoose.model('Disks', Cfg.DisksSchema)

module.exports = db
