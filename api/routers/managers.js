const Manager = require('../../models/manager')
module.exports = function (router) {
  router.get('/manager/:id', function (req, res) {
    Manager.findById(req.params.id).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.get('/manager/email/:email', function (req, res) {
    Manager.find({ 'email': req.params.email }).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })
  router.get('/manager/id/:id', async function (req, res) {
    let client = await Manager.find({ 'user_id': req.params.id })
    res.status(200).json(client)
  })
  router.post('/manager', function (req, res) {
    let manager = new Manager(req.body)
    manager.save(function (err, client) {
      if (err) return console.log(err)
      res.status(200).json(client)
    })
  })

  router.put('/manager/:id', function (req, res) {
    let qry = { _id: req.params.id }
    let doc = {

      isActive: req.body.isActive
    }
    Manager.update(qry, doc, function (err, respRow) {
      if (err) return console.log(err)
      res.status(200).json(respRow)
    })
  })
}
