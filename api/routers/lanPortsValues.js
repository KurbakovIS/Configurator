const LANPortsValue = require('../../models/lanPortValue')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/lpvsQuery', function (req, res) {
    LANPortsValue.find(req.query).exec(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.get('/lpv', function (req, res) {
    console.log(new Date() + ' request lanPortValue MongoDB')
    LANPortsValue.find(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.get('/lpvDisp', async function (req, res) {
    console.log(new Date() + ' request lanPortValue DISP MongoDB')
    let lanports = await LANPortsValue.find()
    res.send(utils.lpvDisp(lanports))
  })
  router.get('/lpv/:id', function (req, res) {
    console.log(new Date() + ' request lanPortValue MongoDB' + ` lanportvalue id - ${req.params.id}`)
    LANPortsValue.find({ id: req.params.id }).exec(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.post('/lpv', function (req, res) {
    let lpv = new LANPortsValue(req.body)
    lpv.save(function (err, lpv) {
      if (err) return console.log(err)
      res.status(200).json(lpv)
    })
  })
}
