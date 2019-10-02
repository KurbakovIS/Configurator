const DValue = require('../../models/disksValue')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/dvQuery', function (req, res) {
    DValue.find(req.query).exec(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.get('/dv', function (req, res) {
    console.log(new Date() + ' request dv MongoDB')
    DValue.find(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.get('/dvDisp', async function (req, res) {
    console.log(new Date() + ' request dv DISP MongoDB')
    let dv = await DValue.find({ 'attributes.value': 'all' })
    res.send(utils.dvDisp(dv))
  })
  router.get('/dvDOMDisp', async function (req, res) {
    console.log(new Date() + ' request dv DISP MongoDB')
    let dv = await DValue.find({ 'attributes.value': 'superDOM' })
    res.send(utils.dvDisp(dv))
  })
  router.get('/dv/:id', function (req, res) {
    console.log(new Date() + ' request dv MongoDB' + ` dv id - ${req.params.id}`)
    DValue.find({ id: req.params.id }).exec(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.post('/dv', function (req, res) {
    let dv = new DValue(req.body)
    dv.save(function (err, dv) {
      if (err) return console.log(err)
      res.status(200).json(dv)
    })
  })
}
