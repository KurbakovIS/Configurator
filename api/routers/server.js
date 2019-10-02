const Server = require('../../models/server')
const Processors = require('../../models/processor')
const _ = require('lodash')
module.exports = function (router) {
  router.get('/server/:id', async function (req, res) {
    let fObjs = await Server.find({ _id: req.params.id })
    let result = await getServer(fObjs)
    res.send(result)
  })
}
async function getServer (server) {
  let element = server[0]
  let resObj = {}
  resObj['_id'] = element['_id']
  resObj['image'] = `http://configurator.talmer.ru/static/img/${getCorpName(element)}.jpg`
  resObj['id'] = element['id']
  resObj['name'] = element['name']
  resObj['server_corp'] = getCorpName(element)
  resObj['corp_type'] = getTypeCorp(element)
  resObj['server_mp'] = getPMName(element)
  resObj['pr_count'] = getPRCount(element)
  resObj['pr_socet'] = getPRSocet(element)
  resObj['corp'] = getCORP(element)
  resObj['ram'] = getRAM(element)
  resObj['dd'] = getDD(element)
  resObj['lan'] = getLAN(element)
  resObj['count_mp'] = getCountMP(element, resObj['corp_type'])
  resObj['count_cc'] = getCountCORP(element)
  resObj['disk_controllers'] = getDiskControllers(element)
  resObj['slim_dvd'] = getSlim(element)
  resObj['ots_525'] = get525(element)
  resObj['usb_com'] = getUSBCOM(element)
  resObj['description'] = await getDescription(element)
  return resObj
}
async function getDescription (element) {
  let mp = findInArray(element['components'], 'category', 'Материнская плата')
  let corp = findInArray(element['components'], 'category', 'Корпус')
  let dObj = {}
  dObj['chipset'] = getChitSet(mp)
  dObj['count_pr'] = getPRCountDescription(mp)
  dObj['model_pr'] = await getModelProcessor(element)
  dObj['takt_ch'] = await getTKTProcessor(element)
  dObj['w_ch'] = getWCh(mp)
  dObj['type_memory'] = getTypeMemory(mp)
  dObj['count_dc'] = getCountDC(mp)
  dObj['dc'] = getDC(mp)
  dObj['rack'] = getRack(corp)
  dObj['sl_r'] = getSlR(element, getTypeCorp(element))
  dObj['dcc'] = getDisks(element)
  return dObj
}
function findInArray (array, sourcefield, targetfield) {
  return array.filter(function (item, i, array) {
    return (item[sourcefield] === targetfield)
  })
}
function getTypeCorp (element) {
  let corp = findInArray(element['components'], 'category', 'Корпус')
  let atr = findInArray(corp[0]['attributes'], 'name', 'Тип корпуса')
  return atr[0]['value']
}
function getCorpName (element) {
  let corp = findInArray(element['components'], 'category', 'Корпус')
  return corp[0]['name']
}
function getPMName (element) {
  let corp = findInArray(element['components'], 'category', 'Материнская плата')
  return corp[0]['name']
}
function getDisks (element) {
  let result = {}
  let arr25 = []
  let arr35 = []
  let dD = getDD(element)

  let keys = _.keys(dD)
  keys.forEach(el => {
    _.keys(dD[el]).forEach(elem => {
      if (+dD[el][elem] > 0) {
        if (elem === '2,5"') {
          arr25.push(+dD[el][elem])
        } if (elem === '3,5"') {
          arr35.push(+dD[el][elem])
        }
      }
    })
  })
  arr25 = _.uniq(arr25)
  arr35 = _.uniq(arr35)
  if (arr25.length > 0) {
    result['2,5"'] = arr25
      .sort(function (a, b) {
        return a - b
      })
      .join()
  }
  if (arr35.length > 0) {
    result['3,5"'] = arr35.sort(function (a, b) {
      return a - b
    }).join()
  }
  return result
}
function getSlR (element, type) {
  if (type === 'Standard') {
    let mp = findInArray(
      element['components'],
      'category',
      'Материнская плата'
    )
    let slpr = findInArray(
      mp[0]['attributes'],
      'category',
      'Слоты расширения'
    )
    let array = []
    slpr.forEach(element => {
      let fObj = {}
      if (+element['value'] > 0) {
        fObj[element['name']] = +element['value']
        array.push(fObj)
      }
    })
    return array
  } else {
    let corp = findInArray(element['components'], 'category', 'Корпус')
    let el = findInArray(
      corp[0]['attributes'],
      'name',
      'Кол-во устр. для подкл. через riser'
    )
    let array = []
    let fObj = {}
    fObj['PCI-E 3.0'] = el[0]['value']
    array.push(fObj)
    return array
  }
}
function getRack (corp) {
  let corpus = findInArray(corp[0]['attributes'], 'name', 'Форм-фактор шасси')
  return corpus[0]['value'].slice(5)
}
function getMaxOfArray (numArray) {
  return Math.max.apply(null, numArray)
}
async function getProcessor (element) {
  let prsocet = await getPRSocet(element)
  let processors = await Processors.find({ 'attributes.value': prsocet })
  return processors
}
async function getModelProcessor (element) {
  let prs = []
  let processors = await getProcessor(element)
  processors.forEach(element => {
    let fObj = findInArray(
      element['attributes'],
      'name',
      'Линейка процессора'
    )
    prs.push(fObj[0]['value'])
  })

  prs = _.compact(_.uniq(prs))
  return prs.join()
}
function getCountDC (element) {
  let sata = findInArray(element[0]['attributes'], 'name', 'SATA')
  let countsata = +sata[0]['value']
  let sas = findInArray(element[0]['attributes'], 'name', 'SAS')
  let countsas = +sas[0]['value']
  return countsas + countsata
}
function getDC (element) {
  let result
  let sata = findInArray(element[0]['attributes'], 'name', 'SATA')
  if (+sata[0]['value'] > 0) result = 'SATA'
  let sas = findInArray(element[0]['attributes'], 'name', 'SAS')
  if (+sas[0]['value'] > 0) {
    if (result.lenght > 0) {
      result += 'или SAS'
    } else result = 'SAS'
  }
  return result
}
function getTypeMemory (element) {
  let chipset = findInArray(element[0]['attributes'], 'name', 'Тип памяти SDRAM')
  return chipset[0]['value']
}
function getWCh (element) {
  let wch = findInArray(element[0]['attributes'], 'name', 'Максимальная частота')
  return wch[0]['value']
}
async function getTKTProcessor (element) {
  let prs = []
  let processors = await getProcessor(element)
  processors.forEach(element => {
    let fObj = findInArray(
      element['attributes'],
      'name',
      'Тактовая частота'
    )
    prs.push(parseFloat(fObj[0]['value']))
  })
  prs = _.compact(_.uniq(prs))
  return getMaxOfArray(prs)
}
function getChitSet (corp) {
  let chipset = findInArray(corp[0]['attributes'], 'name', 'Chipset')
  return chipset[0]['value']
}
function getPRCountDescription (mp) {
  let ff = findInArray(mp[0]['attributes'], 'name', 'Кол-во процессоров')
  return (ff[0]['value'] === '1') ? '1-ого процессора' : '2-х процессоров'
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
function getCountMP (element, type) {
  if (type === 'Standard') {
    let f = findInArray(
      element['components'],
      'category',
      'Материнская плата'
    )
    let mp = findInArray(f[0]['attributes'], 'category', 'Слоты расширения')
    let arrayMP = []
    mp.forEach(element => {
      arrayMP.push(+element['value'])
    })
    let count = arrayMP.reduce(function (sum, current) {
      return sum + current
    }, 0)
    return count
  } else {
    let f = findInArray(element['components'], 'category', 'Корпус')
    let corp = findInArray(
      f[0]['attributes'],
      'name',
      'Кол-во устр. для подкл. через riser'
    )
    return corp[0]['value']
  }
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
function get525 (element) {
  let corp = findInArray(element['components'], 'category', 'Корпус')
  let g525 = findInArray(corp[0]['attributes'], 'category', 'Отсек 5,25\"')
  if (g525.lenght > 0) {
    return { 'g525': g525[0]['value'] }
  } else {
    return {
      'g525': '0' }
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
