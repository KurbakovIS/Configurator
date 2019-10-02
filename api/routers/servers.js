const Server = require('../../models/server')
const utils = require('../../utils/utils')
module.exports = function (router) {
  router.get('/serversAll', function (req, res) {
    console.log(new Date() + ' request servers MongoDB')
    Server.find().exec(function (err, allServers) {
      if (err) throw err
      res.send(allServers)
    })
  })
  router.get('/servers/:id', function (req, res) {
    console.log(new Date() + ' request servers by id MongoDB' + ` server id - ${req.params.id}`)
    Server.find({ '_id': req.params.id }).exec(function (err, server) {
      if (err) throw err
      res.send(server)
    })
  })
  router.get('/serversQuery', function (req, res) {
    Server.find(req.query).exec(function (err, servers) {
      if (err) throw err
      res.send(servers)
    })
  })
  router.get('/serversMin', async function (req, res) {
    let fObjs = await Server.find()
    let result = utils.serversMin(fObjs)
    res.send(result)
  })
  router.get('/serversMin/:id', async function (req, res) {
    let fObjs = await Server.find({ '_id': req.params.id })
    let result = utils.serversMin(fObjs)
    res.send(result)
  })
  router.get('/Rack1U', async function (req, res) {
    console.log(new Date() + ' request servers 1 Unit MongoDB')
    let fObjs = await Server.find({ 'components.attributes.value': 'Rack 1U' })
    let result = getServer(fObjs)
    res.send(result)
  })
  router.get('/Rack1Umin', async function (req, res) {
    console.log(new Date() + ' request servers 1 Unit MongoDB')
    let fObjs = await Server.find({
      'components.attributes.value': 'Rack 1U'
    }).limit(12)
    let result = getServer(fObjs)
    res.send(result)
  })
  router.get('/Rack2U', async function (req, res) {
    console.log(new Date() + ' request servers 2 Unit MongoDB')
    let fObjs = await Server.find({ 'components.attributes.value': 'Rack 2U' })
    let result = getServer(fObjs)
    res.send(result)
  })
  router.get('/Rack2Umin', async function (req, res) {
    console.log(new Date() + ' request servers 2 Unit MongoDB')
    let fObjs = await Server.find({
      'components.attributes.value': 'Rack 2U'
    }).limit(12)
    let result = getServer(fObjs)
    res.send(result)
  })
  router.get('/Rack3U', async function (req, res) {
    console.log(new Date() + ' request servers 3 Unit MongoDB')
    let fObjs = await Server.find({ 'components.attributes.value': 'Rack 3U' })
    let result = getServer(fObjs)
    res.send(result)
  })
  router.get('/Rack3Umin', async function (req, res) {
    console.log(new Date() + ' request servers 3 Unit MongoDB')
    let fObjs = await Server.find({
      'components.attributes.value': 'Rack 3U'
    }).limit(12)
    let result = getServer(fObjs)
    res.send(result)
  })
  router.get('/Rack4U', async function (req, res) {
    console.log(new Date() + ' request servers 4 Unit MongoDB')
    let fObjs = await Server.find({ 'components.attributes.value': 'Rack 4U' })
    let result = getServer(fObjs)
    res.send(result)
  })
  router.get('/Rack4Umin', async function (req, res) {
    console.log(new Date() + ' request servers 4 Unit MongoDB')
    let fObjs = await Server.find({
      'components.attributes.value': 'Rack 4U'
    }).limit(12)
    let result = getServer(fObjs)
    res.send(result)
  })
}

function getServer (server) {
  let result = []
  server.forEach(element => {
    let resObj = {}
    resObj['_id'] = element['_id']
    resObj['id'] = element['id']
    resObj['name'] = element['name']
    resObj['image'] = `http://configurator.talmer.ru/static/img/${getCorpName(element)}.jpg`
    resObj['pr_count'] = getPRCount(element)
    resObj['pr_socet'] = getPRSocet(element)
    resObj['corp'] = getCORP(element)
    resObj['ram'] = getRAM(element)
    resObj['dd'] = getDD(element)
    resObj['back_dd'] = getBackDD(element)
    resObj['lan'] = getLAN(element)
    resObj['count_mp'] = getCountMP(element)
    resObj['count_cc'] = getCountCORP(element)
    resObj['disk_controllers'] = getDiskControllers(element)
    resObj['slim_dvd'] = getSlim(element)
    resObj['ots_525'] = get525(element)
    resObj['usb_com'] = getUSBCOM(element)
    result.push(resObj)
  })
  return result
}
function findInArray (array, sourcefield, targetfield) {
  return array.filter(function (item, i, array) {
    return (item[sourcefield] === targetfield)
  })
}
function getPRSocet (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let ff = findInArray(f[0]['attributes'], 'name', 'Тип сокета')
  return (ff[0]['value'])
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
  return (ff[0]['value'])
}
function get525 (element) {
  let corp = findInArray(element['components'], 'category', 'Корпус')
  let g525 = findInArray(corp[0]['attributes'], 'category', 'Отсек 5,25\"')
  if (g525.lenght > 0) {
    return { 'g525': g525[0]['value'] }
  } else {
    return {
      'g525': '0'
    }
  }
}
function getSlim (element) {
  let corp = findInArray(element['components'], 'category', 'Корпус')
  let slimDVD = findInArray(corp[0]['attributes'], 'category', 'Отсек SlimDVD')
  if (slimDVD.length > 0) {
    let standart = findInArray(slimDVD, 'name', 'SlimDVD в стандартной комплектации')
    if (standart[0]['value'] === '-') {
      let count = findInArray(slimDVD, 'name', 'Кол-во отсеков SlimDVD')
      return { 'slimDVD': count[0]['value'] }
    } else return { 'slimDVD': 'standart' }
  } else return { 'slimDVD': '0' }
}
function getUSBCOM (element) {
  let corp = findInArray(element['components'], 'category', 'Корпус')
  let slimDVD = findInArray(corp[0]['attributes'], 'category', 'Отсек USB/COM')
  if (slimDVD.length > 0) {
    let standart = findInArray(slimDVD, 'name', 'USB/COM в стандартной комплектации')
    if (standart[0]['value'] === '-') {
      let count = findInArray(slimDVD, 'name', 'Кол-во отсеков USB/COM')
      return { 'USBCOM': count[0]['value'] }
    } else return { 'USBCOM': 'standart' }
  } else return { 'USBCOM': '0' }
}

function getDD (element) {
  let f = findInArray(element['components'], 'category', 'Корпус')
  if (f.length > 0) {
    let ff = findInArray(f[0]['attributes'], 'parent_category', 'Дисковые корзины')
    let resObj = {}
    resObj['category'] = 'Дисковые корзины'
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
function getLAN (element) {
  let result = []
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let rj = findInArray(f[0]['attributes'], 'category', 'Встроенный сетевой интерфейс RJ45')
  let sfp = findInArray(f[0]['attributes'], 'category', 'Встроенный сетевой интерфейс SFP+')

  rj.forEach(element => {
    let rjObj = {}
    rjObj[element['name']] = element['value']
    result.push(rjObj)
  })
  sfp.forEach(element => {
    let sfpObj = {}
    sfpObj[element['name']] = element['value']
    result.push(sfpObj)
  })
  return result
}
function getBackDD (element) {
  let f = findInArray(element['components'], 'category', 'Корпус')
  let back = findInArray(f[0]['attributes'], 'category', 'Задний отсек под 2 HDD 2,5" Hot-Swap')
  return back[0]['value']
}
function getCountMP (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let mp = findInArray(f[0]['attributes'], 'category', 'Слоты расширения')
  let arrayMP = []
  mp.forEach(element => { arrayMP.push(+element['value']) })
  let count = arrayMP.reduce(function (sum, current) {
    return sum + current
  }, 0)
  return count
}
function getCountCORP (element) {
  let f = findInArray(element['components'], 'category', 'Корпус')
  let cc = findInArray(f[0]['attributes'], 'category', 'Кол-во отсеков под слоты расширения')
  let arrayCC = []
  cc.forEach(element => { arrayCC.push(+element['value']) })
  let count = arrayCC.reduce(function (sum, current) {
    return sum + current
  }, 0)
  return count
}

function getDiskControllers (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let dc = findInArray(f[0]['attributes'], 'category', 'Дисковый контроллер')
  let arrayDC = []
  dc.forEach(element => {
    let obj = {}
    obj[element['name']] = element['value']
    arrayDC.push(obj)
  })
  arrayDC.push({ 'back_dd': getBackDD(element) })
  return arrayDC
}
function getCorpName (element) {
  let corp = findInArray(element['components'], 'category', 'Корпус')
  return corp[0]['name']
}
