const Counter = require('../../models/ids')
module.exports = function (router) {
  router.post('/counter', function (req, res) {
    let counter = new Counter(req.body)
    counter.save(function (err, counter) {
      if (err) return console.log(err)
      res.status(200).json(counter)
    })
  })
  router.get('/counter', function (req, res) {
    console.log(new Date() + ' request counter MongoDB')
    Counter.find(function (err, counter) {
      if (err) throw err
      res.send(counter)
    })
  })
}
