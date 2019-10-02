const mailer = require('nodemailer')
const filePATHzip = './zip/'
const Cfg = require('./Cfg')
const fs = require('fs')
module.exports.send = function (file) {
  let smtpTransport = mailer.createTransport(Cfg.authMail)
  smtpTransport.sendMail(createMessage(file), (error, response) => {
    if (error) {
      console.log(error)
      return error
    } else {
      console.log(new Date() + ' ' + ' message send')
      return response
    }
  })
}

function createMessage (file) {
  let message = {}
  message.from = Cfg.mailFrom
  message.to = file['mail']
  message.subject = file['theme']
  message.text = 'Specification in attachment'
  message.html = 'Specification in attachment'
  message.attachments = [
    {
      filename: file['zipFile'],
      content: fs.readFileSync(filePATHzip + file['zipFile'])
    }
  ]
  console.log(new Date() + ' Message create')
  return message
}
