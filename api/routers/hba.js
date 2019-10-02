const Hba = require('../../models/hba')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/hbaQuery', function (req, res) {
    Hba.find(req.query).exec(function (err, hba) {
      if (err) throw err
      res.send(hba)
    })
  })
  router.get('/hba', function (req, res) {
    console.log(new Date() + ' request hba MongoDB')
    Hba.find(function (err, hba) {
      if (err) throw err
      res.send(hba)
    })
  })
  router.get('/hbaDisp', async function (req, res) {
    console.log(new Date() + ' request hba DISP MongoDB')
    let hba = await Hba.find()
    res.send(utils.hbaDisp(hba))
  })
  router.get('/hba/:id', function (req, res) {
    console.log(new Date() + ' request hba MongoDB' + ` lanportvalue id - ${req.params.id}`)
    Hba.find({ '_id': req.params.id }).exec(function (err, hba) {
      if (err) throw err
      res.send(hba)
    })
  })
  router.post('/hba', function (req, res) {
    let hba = new Hba(req.body)
    hba.save(function (err, hba) {
      if (err) return console.log(err)
      res.status(200).json(hba)
    })
  })
}
