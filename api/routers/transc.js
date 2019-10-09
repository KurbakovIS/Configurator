const TRANSc = require('../../models/transceiver')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/trsQuery', function (req, res) {
    TRANSc.find(req.query).exec(function (err, trs) {
      if (err) throw err
      res.send(trs)
    })
  })
  router.get('/trs', function (req, res) {
    console.log(new Date() + ' request trs MongoDB')
    TRANSc.find(function (err, trs) {
      if (err) throw err
      res.send(trs)
    })
  })
  router.get('/trsDisp', async function (req, res) {
    console.log(new Date() + ' request trs DISP MongoDB')
    let trs = await TRANSc.find()
    res.send(utils.trsDisp(trs))
  })
  router.get('/trs/:id', function (req, res) {
    console.log(new Date() + ' request trs MongoDB' + ` trs id - ${req.params.id}`)
    TRANSc.find({ '_id': req.params.id }).exec(function (err, trs) {
      if (err) throw err
      res.send(trs)
    })
  })
  router.post('/trs', function (req, res) {
    let trs = new TRANSc(req.body)
    trs.save(function (err, trs) {
      if (err) return console.log(err)
      res.status(200).json(trs)
    })
  })
}
