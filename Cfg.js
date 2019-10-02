const cfg = {}
const mongoose = require('mongoose')
cfg.authMail = {
  host: 'mx1.talmer.ru',
  port: 25,
  secure: false,
  ignoreTLS: true,
  debug: true
}
cfg.mongoURL = 'mongodb://10.100.0.108:27017/configurator'
cfg.mailFrom = 'configurator@talmer.ru'
cfg.cronPeriod = '0 */5 * * * *'
cfg.log = {
  appenders: {
    mailLogs: { type: 'file', filename: 'mail.log' },
    console: { type: 'console' }
  },
  categories: {
    mail: { appenders: ['mailLogs'], level: 'error' },
    another: { appenders: ['console'], level: 'trace' },
    default: { appenders: ['console', 'mailLogs'], level: 'trace' }
  }
}
cfg.ServersSchema = new mongoose.Schema({
  id: Number,
  name: String,
  components: [
    {
      name: String,
      category: String,
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
cfg.ProcessorsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
cfg.DisksSchema = new mongoose.Schema({
  id: Number,
  name: String,
  attributes: [
    {
      name: String,
      category: String,
      value: String
    }
  ]
})
module.exports = cfg
