const Category = require('../../models/category')
module.exports = function (router) {
  router.get('/category', function (req, res) {
    Category.find(function (err, categories) {
      if (err) throw err
      res.send(categories)
    })
  })
  router.post('/category', function (req, res) {
    let category = new Category(req.body)
    category.save(function (err, category) {
      if (err) return console.log(err)
      res.status(200).json(category)
    })
  })
}
