const WProg = require('../../models/wp')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/wpsQuery', function (req, res) {
    WProg.find(req.query).exec(function (err, wp) {
      if (err) throw err
      res.send(wp)
    })
  })
  router.get('/wp', function (req, res) {
    console.log(new Date() + ' request wp MongoDB')
    WProg.find(function (err, wp) {
      if (err) throw err
      res.send(wp)
    })
  })
  router.get('/wpDisp', async function (req, res) {
    console.log(new Date() + ' request wp DISP MongoDB')
    let wps = await WProg.find()
    res.send(utils.wpDisp(wps))
  })
  router.get('/wp/:id', function (req, res) {
    console.log(new Date() + ' request wp MongoDB' + ` lanportvalue id - ${req.params.id}`)
    WProg.find({ _id: req.params.id }).exec(function (err, wp) {
      if (err) throw err
      res.send(wp)
    })
  })
  router.post('/wp', function (req, res) {
    let wp = new WProg(req.body)
    wp.save(function (err, wp) {
      if (err) return console.log(err)
      res.status(200).json(wp)
    })
  })
}
