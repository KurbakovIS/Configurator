const api = require('../api.js')
const Client = require('../../models/client')
const Company = require('../../models/company')
const User = require('../../models/user')
module.exports = function (router) {
  router.post('/login', function (req, res, next) {
    if (req.session.user) return res.redirect('/')

    api.checkUser(req.body)
      .then(function (user) {
        if (user) {
          req.session.user = { id: user._id, name: user.name }
          res.status(200).send(user._id)
        } else {
          return next('error')
        }
      })
      .catch(function (error) {
        return next(error)
      })
  })
  router.get('/user/:id', async function (req, res, next) {
    let user = await User.findOne({ _id: req.params.id })
    if (user) {
      res.status(200).json(user)
    }
  })
  router.post('/register', function (req, res, next) {
    api.createUser(req.body)
      .then(async function (result) {
        console.log(req.body)
        console.log('User created')
        let newClient = {}
        newClient['user_id'] = result._id
        newClient['email'] = req.body.email
        newClient['FirstName'] = req.body.FirstName
        newClient['LastName'] = req.body.LastName
        newClient['phone'] = req.body.phone
        if (req.body.newCompany === true) {
          let nCompany = {}
          nCompany['name'] = req.body.newCompanyName
          nCompany['phone'] = req.body.newCompanyPhone
          let company = new Company(nCompany)
          await company.save(function (err, company) {
            if (err) console.log(err)
          })
          newClient['idCompany'] = company['_id']
        } else { newClient['idCompany'] = req.body.idCompany }

        let client = new Client(newClient)
        await client.save(async function (err, client) {
          if (err) return console.log(err)
          console.log(client)
          let user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { 'client_id': client['_id'] } },
            { returnNewDocument: true }
          )
          console.log(user)
          res.status(200).send(client.user_id)
        })
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        }
      })
  })

  router.post('/logout', function (req, res, next) {
    if (req.session.user) {
      delete req.session.user
      res.status(200).redirect('/')
    }
  })

  router.post('/session', function (req, res, next) {
    // if (req.body.key) return res.redirect('/')

    api.findById(req.body.key).then(function (result) {
      if (result) {
        res.status(200).send(result)
        next()
      } else res.redirect('/')
    })
  })
}
