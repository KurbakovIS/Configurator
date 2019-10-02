const Client = require('../../models/client')
module.exports = function (router) {
  router.get('/client/:id', function (req, res) {
    Client.findById(req.params.id).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })
  router.get('/clients', async function (req, res) {
    let clients = await Client.find()
    res.status(200).json(clients)
  })
  router.get('/client/email/:email', function (req, res) {
    Client.find({ 'email': req.params.email }).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })
  router.get('/client/id/:id', async function (req, res) {
    let client = await Client.find({ 'user_id': req.params.id })
    res.status(200).json(client)
  })
  router.post('/client', function (req, res) {
    let client = new Client(req.body)
    client.save(function (err, client) {
      if (err) return console.log(err)
      res.status(200).json(client)
    })
  })
  router.post('/client/:id', async function (req, res) {
    let client = await Client.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnNewDocument: true }
    )
    res.status(200).send(client)
  })
  router.put('/client/:id', function (req, res) {
    let qry = { _id: req.params.id }
    let doc = {

      isActive: req.body.isActive
    }
    Client.update(qry, doc, function (err, respRow) {
      if (err) return console.log(err)
      res.status(200).json(respRow)
    })
  })
}
