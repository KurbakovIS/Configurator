const zip = require('./zip2')
const Mail = require('./models/mailJobs')
const mongoose = require('mongoose')
const Cfg = require('./Cfg')
mongoose
  .connect(Cfg.mongoURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connect success'))
  .catch(error => console.log(error))
const message = require('./mail')
const CronJob = require('cron').CronJob
const _ = require('lodash')
function sendMail () {
  Mail.find().then(function (result) {
    if (result) {
      result.forEach(element => {
        let fObj = _.clone(element)
        fObj['zipFile'] = zip.createZip(element['orders'])
        message.send(fObj)
        Mail.remove({ '_id': element['_id'] }, function (err) { console.log(err) })
      })
    } else {
      console.log(new Date() + ' no mail messages')
    }
  })
}
const job = new CronJob(Cfg.cronPeriod, function () {
  console.log(new Date() + 'send job mailer')
  sendMail()
})
module.exports.Start = function () { job.start() }
