const mongoose = require('mongoose')
const crypto = require('crypto')
const Cfg = require('../Cfg')
mongoose
  .connect(Cfg.mongoURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connect success'))
  .catch(error => console.log(error))
const User = require('../models/user')

exports.createUser = function (userData) {
  let user = {
    // name: userData.name,
    username: userData.email,
    password: hash(userData.password)
  }
  return new User(user).save()
}
exports.getUser = function (id) {
  return User.findOne(id)
}
exports.findById = function (id) {
  return User.findById(id)
}
exports.checkUser = function (userData) {
  return User
    .findOne({ username: userData.email })
    .then(function (doc) {
      if (doc.password === hash(userData.password)) {
        console.log('User password is ok')
        return Promise.resolve(doc)
      } else {
        return Promise.reject('Error wrong')
      }
    })
}
function hash (text) {
  return crypto.createHash('sha1')
    .update(text).digest('base64')
}
