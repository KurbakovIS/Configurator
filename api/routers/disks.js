const Disks = require('../../models/disk')
const _ = require('lodash')
module.exports = function (router) {
  router.get('/disksQuery', function (req, res) {
    Disks.find(req.query).exec(function (err, disks) {
      if (err) throw err
      res.send(disks)
    })
  })
  router.get('/disksAll', function (req, res) {
    console.log(new Date() + ' request disks MongoDB')
    Disks.find(function (err, allDisks) {
      if (err) throw err
      res.send(allDisks)
    })
  })
  router.get('/disks/:id', function (req, res) {
    console.log(new Date() + ' request disks MongoDB' + ` disk id - ${req.params.id}`)
    Disks.find({ 'id': req.params.id }).exec(function (err, disk) {
      if (err) throw err
      res.send(disk)
    })
  })
  router.get('/disks', async function (req, res) {
    console.log(new Date() + ' request disks MongoDB')
    let allDisks = []
    let disks = await Disks.find()
    disks.forEach(disk => {
      let fObj = {}
      let form = findInArray(disk['attributes'], 'name', 'Форм фактор')
      let val = findInArray(disk['attributes'], 'name', 'Объем')
      fObj[form[0]['value']] = val[0]['value']
      allDisks.push(fObj)
    })
    res.send(_.uniqWith(allDisks, _.isEqual))
  })
}

function findInArray (array, sourcefield, targetfield) {
  return array.filter(function (item, i, array) {
    return (item[sourcefield] === targetfield)
  })
}
