const OpSys = require('../../models/os')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/osQuery', function (req, res) {
    OpSys.find(req.query).exec(function (err, os) {
      if (err) throw err
      res.send(os)
    })
  })
  router.get('/os', function (req, res) {
    console.log(new Date() + ' request wp MongoDB')
    OpSys.find(function (err, os) {
      if (err) throw err
      res.send(os)
    })
  })
  router.get('/osDisp', async function (req, res) {
    console.log(new Date() + ' request os DISP MongoDB')
    let os = await OpSys.find()
    res.send(utils.osDisp(os))
  })
  router.get('/os/:id', function (req, res) {
    console.log(new Date() + ' request os MongoDB' + ` os id - ${req.params.id}`)
    OpSys.find({ id: req.params.id }).exec(function (err, os) {
      if (err) throw err
      res.send(os)
    })
  })
  router.post('/os', function (req, res) {
    let os = new OpSys(req.body)
    os.save(function (err, os) {
      if (err) return console.log(err)
      res.status(200).json(os)
    })
  })
}
