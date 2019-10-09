const RAIDCon = require('../../models/raidcontroller')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/rcsQuery', function (req, res) {
    RAIDCon.find(req.query).exec(function (err, rc) {
      if (err) throw err
      res.send(rc)
    })
  })
  router.get('/rcs', function (req, res) {
    console.log(new Date() + ' request raidcontroller MongoDB')
    RAIDCon.find(function (err, wp) {
      if (err) throw err
      res.send(wp)
    })
  })
  router.get('/rc/:id', function (req, res) {
    console.log(new Date() + ' request raidcontroller MongoDB' + ` raidcontroller id - ${req.params.id}`)
    RAIDCon.find({ id: req.params.id }).exec(function (err, wp) {
      if (err) throw err
      res.send(wp)
    })
  })
  router.get('/rcsDisp', async function (req, res) {
    console.log(new Date() + ' request rcs DISP MongoDB')
    let rc = await RAIDCon.find()
    res.send(utils.rcsDisp(rc))
  })
  router.post('/rc', function (req, res) {
    let rc = new RAIDCon(req.body)
    rc.save(function (err, rc) {
      if (err) return console.log(err)
      res.status(200).json(rc)
    })
  })
}
