const Cart = require('../../models/cart')
module.exports = function (router) {
  router.get('/cart/:id', async function (req, res) {
    console.log(new Date() + ' request cart MongoDB')
    let cart = await Cart.find({ 'user_id': req.params.id })
    res.status(200).send(cart)
  })
  router.get('/cart/position/:id', async function (req, res) {
    console.log(new Date() + ' request cart position MongoDB')
    let cart = await Cart.findById(req.params.id)
    res.status(200).send(cart)
  })
  router.post('/cart', function (req, res) {
    console.log(new Date() + ` request cart MongoDB ${req.body}`)
    let cart = new Cart(req.body)
    cart.save(function (err, os) {
      if (err) return console.log(err)
      res.status(200).json(cart)
    })
  })
  router.delete('/cart/:id', async function (req, res) {
    let cart = await Cart.findByIdAndRemove(req.params.id)
    res.send(cart)
  })
  router.post('/cart/:id', async function (req, res) {
    let cart = await Cart.findOneAndUpdate({ '_id': req.params.id },
      { $set: { count_position: req.body.count } },
      { returnNewDocument: true }
    )
    res.send(cart)
  })
  router.delete('/cleancart/:id', async function (req, res) {
    let cart = await Cart.remove({ 'user_id': req.params.id })
    res.send(cart)
  })
}
