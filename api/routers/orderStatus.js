const Counter = require('../../models/order_status')
module.exports = function (router) {
  router.post('/orderStatus', function (req, res) {
    let counter = new Counter(req.body)
    counter.save(function (err, counter) {
      if (err) return console.log(err)
      res.status(200).json(counter)
    })
  })
  router.get('/orderStatus', function (req, res) {
    console.log(new Date() + ' request orderStatus MongoDB')
    Counter.find(function (err, counter) {
      if (err) throw err
      res.send(counter)
    })
  })
}
