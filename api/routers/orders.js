const Order = require('../../models/order')
const Client = require('../../models/client')
const Manager = require('../../models/manager')
const Mail = require('../../models/mailJobs')
const Counter = require('../../models/ids')
const Company = require('../../models/company')
const Server = require('../../models/server')
const Cart = require('../../models/cart')
const utils = require('../../converter')
const _ = require('lodash')
module.exports = function (router) {
  router.get('/orderQuery', function (req, res) {
    Order.find(req.query).exec(function (err, order) {
      if (err) throw err
      res.send(order)
    })
  })
  router.get('/orders', function (req, res) {
    console.log(new Date() + ' request order MongoDB')
    Order.find(function (err, order) {
      if (err) throw err
      res.send(order)
    })
  })
  router.get('/ordersAdmin', async function (req, res) {
    console.log(new Date() + ' request order MongoDB')
    let ordersArray = []
    let orders = await Order.find()
    orders.forEach(order => {
      order['position'].forEach(position => {
        let fObj = {}
        fObj['order_id'] = order['order_id']
        fObj['order_status'] = order['order_status']
        fObj['order_date'] = order['order_date']
        fObj['customer'] = order['customer']['fullName']
        fObj['position_id'] = position['position_id']
        fObj['position_count'] = position['count_position']
        fObj['server_name'] = position['server_name']
        ordersArray.push(fObj)
      })
    })
    res.send(ordersArray)
  })
  router.get('/orders/customer/:id', async function (req, res) {
    let orders = await Order.find({ 'customer.id': req.params.id })
    res.status(200).json(orders)
  })
  router.get('/orders/manager/:id', async function (req, res) {
    let orders = await Order.find({ 'manager.id': req.params.id })
    res.status(200).json(orders)
  })
  router.get('/orders/user/:id', async function (req, res) {
    let orders = await Order.find({ 'user_id': req.params.id })
    res.status(200).json(orders)
  })
  router.get('/orders/company/:id', async function (req, res) {
    let orders = await Order.find({ 'customer.company_id': req.params.id })
    res.status(200).json(orders)
  })
  router.get('/order/:id', function (req, res) {
    console.log(
      new Date() +
          ' request order MongoDB' +
          ` order id - ${req.params.id}`
    )
    Order.find({ '_id': req.params.id }).exec(function (err, order) {
      if (err) throw err
      res.send(order)
    })
  })
  router.post('/order', async function (req, res) {
    let data = await struct(req.body)
    let order = new Order(data)
    order.save(function (err, os) {
      if (err) return console.log(err)

      res.status(200).json(order)
    })
    let dataArray = utils.gen([order], 'order')
    dataArray.forEach(element => {
      utils.c(element, 'order')
    })
    let dataArray2 = await spec([order])
    let fileNames = []
    console.log(dataArray2)
    dataArray2.forEach(element => {
      let fObj = {}
      utils.c(element, 'specification')
      fObj['name'] = `specification-${
        element['order']['Номер позиции']
      }.pdf`
      fileNames.push(fObj)
    })
    setMail(fileNames)
  })
  router.post('/dublicateOrder/:id', async function (req, res) {
    let order = await Order.findById(req.params.id)
    let data = await struct(order)
    let cartArray = []
    data['position'].forEach(position => {
      position = _.omit(position, '_id')
      let newCart = new Cart(position)
      newCart.save(function (err, os) {
        if (err) return console.log(err)
      })
      cartArray.push(newCart)
    })
    res.status(200).json(cartArray)
  })
  router.get('/pdf/:id', function (req, res) {
    console.log(new Date() + ` request order - ${req.params.id}`)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=order-${req.params.id}.pdf`
    )
    res.download(
      `/opt/configurator-app/test/configurator-server/orders/order-${
        req.params.id
      }.pdf`,
      `document.pdf`
    )
  })
  router.get('/specification/:id', function (req, res) {
    console.log(new Date() + ` request order - ${req.params.id}`)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=order-${req.params.id}.pdf`
    )
    res.download(
      `/opt/configurator-app/test/configurator-server/orders/specification-${
        req.params.id
      }.pdf`,
      `document.pdf`
    )
  })
}
function setMail (ordersArray) {
  let mail = {}
  mail['mail'] = 'i.ratnikov@talmer.ru, v.vikhorev@talmer.ru'
  mail['theme'] = 'Configurator specification by order'
  mail['orders'] = ordersArray
  let mailMessage = new Mail(mail)
  mailMessage.save(function (err, os) {
    if (err) return console.log(err)
  })
  return mailMessage
}
async function getNextSequenceValue (sequenceName) {
  let sequenceDocument = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnNewDocument: true }
  )
  return sequenceDocument.sequence_value
}
async function struct (data) {
  data = _.omit(data, '_id')
  data['order_id'] = 'TA-19-00-' + await getNextSequenceValue('order')
  data['order_status_id'] = '5c925dec4c3de61b114a40a2'
  data['order_status'] = 'На обработке'
  let customer = await getCustomerID(data['user_id'])
  if (customer) {
    data['customer']['id'] = customer
  }
  let company = await getCompanyID(data['user_id'])
  if (company) {
    data['customer']['company_id'] = company
  }
  let manager = await getManager(data['user_id'])
  if (manager) {
    data['manager'] = manager
  }
  let positionArray = []
  let positionId = 1
  data['position'].forEach((position, i) => {
    position['position_id'] = data['order_id'] + '-' + positionId
    if (position['attributes']) {
      let attributesArray = []
      position['attributes'].forEach(attributes => {
        attributesArray.push(_.omit(attributes, '_id'))
      })
      position['attributes'] = attributesArray
    }
    positionArray.push(_.omit(position, '_id'))
    positionId++
  })
  data['position'] = positionArray
  return data
}
async function getCustomerID (id) {
  let client = await Client.find({ 'user_id': id })
  if (!client) return null
  return client[0]['_id']
}
async function getCompanyID (id) {
  let client = await Client.find({ 'user_id': id })
  if (!client) return null
  return (client[0]['idCompany']) ? client[0]['idCompany'] : null
}
async function getManager (id) {
  let resManager = {}
  let managerID = await Client.find({ 'user_id': id })
  if (managerID) {
    let manager = await Manager.findById(managerID[0]['idManager'])
    if (manager) {
      resManager['id'] = manager['_id']
      resManager['fullName'] =
      manager['lastName'] +
      ' ' +
      manager['firstName'] +
      ' ' +
      manager['secondName']
      resManager['email'] = manager['email']
      resManager['phone'] = manager['phone']
      return resManager
    }
  } else return null
}
async function spec (data) {
  let arrayObjects = generate(data)
  let client = await Client.findOne({
    _id: arrayObjects[0]['system']['customer_id']
  })
  let company = await Company.findOne({ _id: client['idCompany'] })
  let companyName = company['name']

  let convertArray = []
  await asyncForEach(arrayObjects, async (element) => {
    let memory = await getMemory(element['system']['server_id'])
    element['customer']['Компания заказчика'] = companyName
    if (element['order']['Оперативная память']) {
      element['order']['Оперативная память'] =
        memory + ' ' + element['order']['Оперативная память']
    }
    console.log(element)
    convertArray.push(element)
  })
  console.log(convertArray)
  return convertArray
}
function generate (data) {
  let arrayObjects = []
  data.forEach(data => {
    data['position'].forEach(element => {
      let obj = {}
      obj['header'] = _.clone(getHeader(data))
      obj['customer'] = _.clone(getCustomer(data))
      obj['tech_customer'] = _.clone(getTechCustomer(data))
      obj['manager'] = _.clone(getManagerPDF(data))
      obj['order'] = _.clone(getBodyFull(element))
      obj['disks'] = _.clone(getDisksArray(element))
      obj['system'] = _.clone(getSystemInfo(data, element))
      arrayObjects.push(obj)
    })
  })
  return arrayObjects
}
async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
function getSystemInfo (data, element) {
  let fObj = {}
  fObj['user_id'] = data['user_id']
  fObj['customer_id'] = data['customer']['id']
  fObj['manager_id'] = data['manager']['id']
  fObj['server_id'] = element['server_id']
  return fObj
}
function getHeader (data) {
  let fObj = {}
  let orderDate = data['order_date'].toString()
  let dateShip = data['date_ship'].toString()
  fObj['Номер заказа'] = data['order_id']
  fObj['Дата заказа'] = orderDate.slice(0, -24)
  fObj['Дата желаемой доставки'] = dateShip.slice(0, -24)
  if (data['comments']) fObj['Комментарий к заказу'] = data['comments']
  return fObj
}
function getCustomer (data, type) {
  let fObj = {}
  fObj['ФИО заказчика'] = data['customer']['fullName']
  fObj['Контактный телефон'] = data['customer']['phone']
  fObj['Адрес электронной почты'] = data['customer']['email']
  fObj['Адрес доставки'] = data['address_ship']
  return fObj
}
async function getMemory (id) {
  if (!id) return null
  let server = await Server.findOne({ '_id': id })
  if (!server) return null
  let mp = findInArray(server['components'], 'category', 'Материнская плата')
  let arr = []
  let ecc = findInArray(mp[0]['attributes'], 'category', 'Характеристики RAM')
  if (!isEmptyObject(ecc[0])) {
    if (ecc[0]['name'] === 'ECC' && ecc[0]['name'] === 'да') {
      arr.push(ecc[0]['name'])
    }
  }
  let memoryType = findInArray(mp[0]['attributes'], 'name', 'Тип памяти SDRAM')
  if (!isEmptyObject(memoryType[0])) {
    arr.push(memoryType[0]['value'])
  }
  let typeModule = findInArray(mp[0]['attributes'], 'name', 'Тип модуля')
  if (!isEmptyObject(typeModule[0])) {
    arr.push(typeModule[0]['value'])
  }
  let sDIMM = findInArray(mp[0]['attributes'], 'category', 'Форм-фактор')
  if (!isEmptyObject(sDIMM[0])) {
    if (sDIMM[0]['value'] === 'да') {
      arr.push(sDIMM[0]['name'])
    }
  }
  return arr.join('/')
}
function findInArray (array, sourcefield, targetfield) {
  return array.filter(function (item, i, array) {
    return (item[sourcefield] === targetfield)
  })
}
function getManagerPDF (data) {
  if (!isEmptyObject(data['manager'])) {
    let fObj = {}
    fObj['Персональный менеджер ТАЛМЕР'] = data['manager']['fullName']
    fObj['Контактный телефон менеджера'] = data['manager']['phone']
    fObj['Контактный email менеджера'] = data['manager']['email']
    return fObj
  } else return {}
}
function getTechCustomer (data) {
  if (!isEmptyObject(data['tech_customer'])) {
    let fObj = {}
    fObj['Технический специалист от заказчика'] = data['tech_customer']['fullName']
    fObj['Контактный телефон специалиста'] = data['tech_customer']['phone']
    fObj['Контактный email специалиста'] = data['tech_customer']['email']
    return fObj
  } else return {}
}
function normalize (element) {
  let resObj = {}
  // Общие случаи
  if (element['name'] === element['category']) {
    if (
      !element['count'] ||
      element['count'] === 0 ||
      element['count'] === '0' ||
      element['count'] == ''
    ) {
      resObj = {}
      resObj[element['name']] = element['value']
    } else {
      resObj = {}
      resObj[element['name']] = element['value'] + ' ' + element['count'] + ' шт.'
    }
  } else {
    if (!element['count'] || element['count'] === 0 || element['count'] === '0' || element['count'] == '') {
      resObj = {}
      resObj[element['category'] + ' ' + element['name']] = element['value']
    } else {
      resObj = {}
      resObj[element['category'] + ' ' + element['name']] =
        element['value'] + ' ' + element['count'] + ' шт.'
    }
  }
  // Частные случаи
  if (
    element['value'] === 'Объем' &&
    element['name'] === 'Оперативная память'
  ) {
    resObj = {}
    resObj[element['name']] = element['count'] + ' Гб'
  }
  if (
    element['name'] === 'Трансивер' ||
    element['name'] === 'HBA трансивер') {
    resObj = {}
    resObj[element['name'] + ' ' + element['value']] = element['count'] + ' шт.'
  }
  if (element['category'] === 'Системный накопитель') {
    resObj = {}
    resObj[element['category'] + ' "' + element['name'] + '"'] = element['value'] + 'Гб.  ' + element['count'] + ' шт.'
  }
  return resObj
}
function getBodyFull (position) {
  let fObj = {}
  fObj['Продукт'] = 'Сервер ТАЛМЕР ' + position['server_name']
  fObj['Номер позиции'] = position['position_id']
  fObj['Количество серверов'] = position['count_position'] + ' шт.'
  fObj['Тип'] = position['server_type']
  fObj['Серверный корпус'] = '1 шт.'
  fObj['Модель корпуса'] = position['server_corp']
  fObj['Серверная материнская плата'] = '1 шт.'
  fObj['Модель материнской платы'] = position['server_mp']
  position['attributes'].forEach(element => {
    let normEl = normalize(element)
    fObj[_.keys(normEl).join(' ')] = _.values(normEl).join(' ')
  })
  if (position['comments_position']) {
    fObj['Комментарии к серверу'] = position['comments_position']
  }
  return fObj
}
function getDisksArray (position) {
  let result = []
  if (position['disks']) {
    position['disks'].forEach(element => {
      if (element['form']) {
        let fObj = {}
        fObj[element['form'] + ' ' + element['interface']] = element['value'] + 'Гб.  ' + element['count'] + 'шт.'
        result.push(fObj)
      } else {
        result.push({ 'Подсистема хранения': 'не заполнена' })
      }
    })
    return result
  } else return null
}
function isEmptyObject (obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false
    }
  }
  return true
}
