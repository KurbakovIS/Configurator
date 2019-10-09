module.exports.serversMin = function (servers) {
  let result = []
  servers.forEach(element => {
    let resObj = {}
    resObj['_id'] = element['_id']
    resObj['id'] = element['id']
    resObj['name'] = element['name']
    resObj['pr_count'] = getPRCount(element)
    resObj['corp'] = getCORP(element)
    resObj['ram'] = getRAM(element)
    resObj['dd'] = getDD(element)
    resObj['lan'] = getLAN(element)
    result.push(resObj)
  })
  return result
}
module.exports.server = function server (server) {
  let result = []
  server.forEach(element => {
    let resObj = {}
    resObj['_id'] = element['_id']
    resObj['id'] = element['id']
    resObj['name'] = element['name']
    resObj['image'] = `http://10.100.0.108:8900/static/img/${getCorpName(element)}.jpg`
    resObj['pr_count'] = getPRCount(element)
    resObj['pr_socet'] = getPRSocet(element)
    resObj['corp'] = getCORP(element)
    resObj['ram'] = getRAM2(element)
    resObj['dd'] = getDD(element)
    resObj['back_dd'] = getBackDD(element)
    resObj['lan'] = getLAN(element)
    resObj['count_mp'] = getCountMP(element)
    resObj['count_cc'] = getCountCORP(element)
    resObj['disk_controllers'] = getDiskControllers(element)
    result.push(resObj)
  })
  return result
}
module.exports.lpvDisp = function (array) {
  let resArray = []
  array.forEach(element => {
    let fObj = {}
    fObj[element['name']] = element['attributes'][0]['value']
    resArray.push(fObj)
  })
  return resArray
}
function findInArray (array, sourcefield, targetfield) {
  return array.filter(function (item, i, array) {
    return (item[sourcefield] === targetfield)
  })
}
module.exports.wpDisp = function (array) {
  let resArray = []
  array.forEach(element => {
    resArray.push(element['name'])
  })
  return resArray
}
module.exports.hbaDisp = function (array) {
  let resArray = []
  array.forEach(element => {
    let fObj = {}
    fObj[element['name']] = element['attributes'][0]['value']
    resArray.push(fObj)
  })
  return resArray
}
module.exports.dvDisp = function (array) {
  let resArray = []
  array.forEach(element => {
    resArray.push(element['name'])
  })
  return resArray
}
module.exports.trsDisp = function (array) {
  let resArray = []
  array.forEach(element => {
    resArray.push(element['name'])
  })
  return resArray
}
module.exports.osDisp = function (array) {
  let resArray = []
  array.forEach(element => {
    resArray.push(element['name'])
  })
  return resArray
}
module.exports.rcsDisp = function (array) {
  let resArray = []
  array.forEach(element => {
    let fObj = {}
    fObj[element['name']] = element['attributes'][0]['value']
    resArray.push(fObj)
  })
  return resArray
}
function getPRSocet (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let ff = findInArray(f[0]['attributes'], 'name', 'Тип сокета')
  return (ff[0]['value'])
}
function getPRCount (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let ff = findInArray(f[0]['attributes'], 'name', 'Кол-во процессоров')
  return (ff[0]['value'] === '1') ? 'Однопроцессорный' : 'Двухпроцессорный'
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
  return (`Максимальный объём ОЗУ ${ff[0]['value']} Гб`)
}
function getRAM2 (element) {
  let f = findInArray(element['components'], 'category', 'Материнская плата')
  let ff = findInArray(f[0]['attributes'], 'name', 'Максимальный объем памяти')
  return (ff[0]['value'])
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
