// server.js
const cors = require('cors')
// const fs = require('fs')
const Cfg = require('./Cfg')
// const db = require('./db')
// const odoo = require('./odoo')
const mailer = require('./mailer')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const errorHandler = require('errorhandler')
const methodOverride = require('method-override')
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}
const express = require('express')
const api = require('./api')
const app = express()
const bodyParser = require('body-parser')
// async function getObjects (file) {
//   if (!file) return
//   let objects
//   await odoo.getJSON(file).then(async result => {
//     objects = result
//   })
//   return objects
// }
async function startServerApp () {
  // let servers = await getObjects('servers')
  // let disks = await getObjects('disks')
  // let processors = await getObjects('processors')
  // let arrayServers = JSON.parse(servers)
  // let arrayDisks = JSON.parse(disks)
  // let arrayProcessors = JSON.parse(processors)
  // arrayServers.forEach(element => {
  //   db.Servers.find({ id: element['id'] }).exec(function (err, server) {
  //     if (err) throw err
  //     if (!server) {
  //       let el = new db.Servers(element)
  //       el.save(function (err) {
  //         if (err) throw err
  //         console.log('Server ' + el['id'] + ' successfully saved.')
  //       })
  //     }
  //   })
  // })
  // arrayDisks.forEach(element => {
  //   db.Disks.find({ id: element['id'] }).exec(function (err, disk) {
  //     if (err) throw err
  //     if (!disk) {
  //       let el = new db.Disks(element)
  //       el.save(function (err) {
  //         if (err) throw err
  //         console.log('Disk ' + el['id'] + ' successfully saved.')
  //       })
  //     }
  //   })
  // })
  // arrayProcessors.forEach(element => {
  //   let el = new db.Processors(element)
  //   el.save(function (err) {
  //     if (err) throw err
  //     console.log('Processor ' + el['id'] + ' successfully saved.')
  //   })
  // })
  app.use('/static/', express.static(path.join(__dirname, 'static')))
  app.use('/', express.static(path.join(__dirname, 'client')))
  app.use(cors())
  app.use(errorHandler())
  app.use(methodOverride())
  app.use(allowCrossDomain)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(
    session({
      secret: 'fucking vihorev and vaginalis',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        url: Cfg.mongoURL
      })
    })
  )
  app.use('/api', api)
  app.get('*', function (req, res, next) {
    res.redirect('/')
  })
  app.get('/doc', function (req, res) {
    console.log(new Date() + ' request doc')
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf')
    res.download('./doc/document.pdf', 'document.pdf')
  })
  app.listen(666, '10.100.0.108', function () {
    console.log('BackEnd server run')
    mailer.Start()
  })
}
startServerApp()
