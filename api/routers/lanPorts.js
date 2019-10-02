const LANPorts = require('../../models/lanPort')
module.exports = function (router) {
  router.get('/lanportsQuery', function (req, res) {
    LANPorts.find(req.query).exec(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.get('/lanports', function (req, res) {
    console.log(new Date() + ' request lanPort MongoDB')
    LANPorts.find(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.get('/lanports/:id', function (req, res) {
    console.log(new Date() + ' request lanPort MongoDB' + ` lanport id - ${req.params.id}`)
    LANPorts.find({ id: req.params.id }).exec(function (err, lanports) {
      if (err) throw err
      res.send(lanports)
    })
  })
  router.post('/lanport', function (req, res) {
    let lanport = new LANPorts(req.body)
    lanport.save(function (err, lanport) {
      if (err) return console.log(err)
      res.status(200).json(lanport)
    })
  })
}
