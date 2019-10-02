const Server = require('../../models/server')
const LANPorts = require('../../models/lanPort')
const Processors = require('../../models/processor')
const _ = require('lodash')
module.exports = function (router) {
  router.get('/filters', async function (req, res) {
    console.log(new Date() + ' filter request')
    let processors = await Processors.find()
    let resObj = {}
    let arrayProcessLines = []
    let arrayModelProcessors = []
    let arrayFormFactorServers = []
    let arrayMemory = []
    let arrayDisks = []
    let arrayLANControllers = []
    processors.forEach(element => {
      let resObj = {}
      let fObj = findInArray(
        element['attributes'],
        'name',
        'Линейка процессора'
      )
      let lObj = findInArray(
        element['attributes'],
        'name',
        'Сокет'
      )
      resObj[fObj[0]['value']] = lObj[0]['value']
      arrayProcessLines.push(resObj)
    })
    arrayProcessLines = _.uniqWith(arrayProcessLines, _.isEqual)
    arrayProcessLines = _.sortBy(arrayProcessLines, _.isEqual)
    resObj['processors_Lines'] = arrayProcessLines
    let servers = await Server.find()
    servers.forEach(element => {
      arrayModelProcessors.push(getPRCount(element))
      arrayFormFactorServers.push(getCORP(element))
      arrayMemory.push(getRAM(element))
      arrayDisks.push(getDD(element))
    })
    let lanPorts = await LANPorts.find({ 'attributes.value': 'true' })
    lanPorts.forEach(element => {
      arrayLANControllers.push(element['name'])
    })
    arrayDisks = getDisksValues(arrayDisks)
    arrayMemory = _.compact(_.uniq(arrayMemory))
    arrayModelProcessors = _.uniq(arrayModelProcessors)
    arrayFormFactorServers = _.compact(_.uniq(arrayFormFactorServers))
    arrayMemory = arrayMemory.sort(function (a, b) { return a - b })
    arrayMemory.unshift('Все')
    resObj['processors_Model'] = _.reverse(arrayModelProcessors)
    resObj['formFactor'] = arrayFormFactorServers
    resObj['max_Memory'] = arrayMemory
    resObj['disks_Array'] = arrayDisks
    resObj['lan_controller'] = arrayLANControllers
    res.send(resObj)
  })
}
function findInArray (array, sourcefield, targetfield) {
  return array.filter(function (item, i, array) {
    return (item[sourcefield] === targetfield)
  })
}
function getDisksValues (array) {
  let result = {}
  let arr25 = []
  let arr35 = []
  array.forEach(element => {
    let keys = _.keys(element)
    keys.forEach(el => {
      _.keys(element[el]).forEach(elem => {
        if (elem === '2,5"') {
          arr25.push(element[el][elem])
        } if (elem === '3,5"') {
          arr35.push(element[el][elem])
        }
      })
    })
  })
  arr25 = _.uniq(arr25)
  arr35 = _.uniq(arr35)
  arr25 = arr25.sort(function (a, b) {
    return a - b
  })
  arr35 = arr35.sort(function (a, b) {
    return a - b
  })
  arr25.shift()
  arr25.unshift('Все')
  arr35.shift()
  arr35.unshift('Все')
  result['2,5"'] = arr25
  result['3,5"'] = arr35
  return result
}
function getPRCount (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let ff = findInArray(f[0]['attributes'], 'name', 'Кол-во процессоров')
  return (ff[0]['value'] === '1') ? 'Однопроцессорный сервер' : 'Двухпроцессорный сервер'
}
function getCORP (element) {
  let f = findInArray(element['components'], 'category', 'Корпус')
  if (f.length > 0) {
    let ff = findInArray(
      f[0]['attributes'],
      'name',
      'Форм-фактор шасси'
    )
    return ff[0]['value']
  } else return null
}
function getRAM (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let ff = findInArray(f[0]['attributes'], 'name', 'Максимальный объем памяти')
  return +ff[0]['value']
}
function getDD (element) {
  let f = findInArray(element['components'], 'category', 'Корпус')
  if (f.length > 0) {
    let ff = findInArray(f[0]['attributes'], 'parent_category', 'Дисковые корзины')
    let resObj = {}
    let fixObj = {}
    let hsObj = {}
    let fixed = findInArray(ff, 'category', 'Fixed')
    let hotSwap = findInArray(ff, 'category', 'Hot-swap')
    fixed.forEach(el => {
      fixObj[el['name']] = el['value']
    })
    hotSwap.forEach(el => {
      hsObj[el['name']] = el['value']
    })
    resObj['fixed'] = fixObj
    resObj['hot_swap'] = hsObj
    return resObj
  } else return null
}
