const Company = require('../../models/company')
module.exports = function (router) {
  router.get('/company/:id', function (req, res) {
    Company.findById(req.params.id).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.get('/company/email/:email', function (req, res) {
    Company.find({ 'email': req.params.email }).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })
  router.get('/company/id/:id', async function (req, res) {
    let client = await Company.find({ 'user_id': req.params.id })
    res.status(200).json(client)
  })
  router.get('/company', async function (req, res) {
    let company = await Company.find({ 'active': true })
    res.status(200).json(company)
  })
  router.post('/company', function (req, res) {
    let company = new Company(req.body)
    company.save(function (err, client) {
      if (err) return console.log(err)
      res.status(200).json(client)
    })
  })
  router.post('/company/:id', async function (req, res) {
    let company = await Company.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnNewDocument: true }
    )
    res.status(200).send(company)
  })

  router.put('/company/:id', function (req, res) {
    let qry = { _id: req.params.id }
    let doc = {

      isActive: req.body.isActive
    }
    Company.update(qry, doc, function (err, respRow) {
      if (err) return console.log(err)
      res.status(200).json(respRow)
    })
  })
}
