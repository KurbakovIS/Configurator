const _ = require('lodash')
const PDFDocument = require('pdfkit')
const PDFTable = require('voilab-pdf-table')
const fs = require('fs')
module.exports.gen = function (data, type) {
  let arrayObjects = []
  data.forEach(data => {
    data['position'].forEach(element => {
      let obj = {}
      obj['header'] = _.clone(getHeader(data))
      obj['customer'] = _.clone(getCustomer(data, type))

      obj['tech_customer'] = _.clone(getTechCustomer(data))

      obj['manager'] = _.clone(getManager(data))
      if (type === 'order') {
        obj['order'] = _.clone(getBody(element))
      } else { obj['order'] = _.clone(getBodyFull(element)) }
      obj['disks'] = _.clone(getDisksArray(element))
      obj['system'] = _.clone(getSystemInfo(data, element))
      arrayObjects.push(obj)
    })
  })
  return arrayObjects
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
  // if (type === 'specification') {
  //   fObj['Компания заказчика'] = getCompany(data['customer']['id'])
  // }
  fObj['ФИО заказчика'] = data['customer']['fullName']
  fObj['Контактный телефон'] = data['customer']['phone']
  fObj['Адрес электронной почты'] = data['customer']['email']
  fObj['Адрес доставки'] = data['address_ship']
  return fObj
}
function getManager (data) {
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
    resObj[element['category'] + ' "' + element['name'] + '"'] =
      element['value'] + 'Гб.  ' + element['count'] + ' шт.'
  }
  return resObj
}
function getBodyFull (position) {
  let fObj = {}
  fObj['Продукт'] = 'Сервер ТАЛМЕР ' + position['server_name']
  fObj['Номер позиции'] = position['position_id']
  fObj['Количество серверов'] = position['count_position'] + ' шт.'
  fObj['Тип'] = position['server_type']
  fObj['Серверный корпус'] = '1 шт'
  fObj['Модель корпуса'] = position['server_corp']
  fObj['Серверная материнская плата'] = '1 шт'
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
function getBody (position) {
  let fObj = {}
  fObj['Продукт'] = 'Сервер ТАЛМЕР ' + position['server_name']
  fObj['Номер позиции'] = position['position_id']
  fObj['Количество серверов'] = position['count_position'] + ' шт.'
  fObj['Серверный корпус'] = '1 шт.'
  fObj['Серверная материнская плата'] = '1 шт.'
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
module.exports.c = function (file, type) {
  let json = file
  let head = json['header']
  let manag = json['manager']
  let techcustomer = json['tech_customer']
  let customer = json['customer']
  let order = json['order']
  let disks = json['disks']
  // let comments = normalize.comments(json)
  let fileName = `${type}-${order['Номер позиции']}.pdf`
  let filePATH = './orders/'
  let doc = new PDFDocument({
    bufferPages: true
  })
  let table = new PDFTable(doc, {
    bottomMargin: 30
  })
  let table6 = new PDFTable(doc, {
    bottomMargin: 30
  })
  let table5 = new PDFTable(doc, {
    bottomMargin: 30
  })
  let table4 = new PDFTable(doc, {
    bottomMargin: 30
  })
  let table2 = new PDFTable(doc, {
    bottomMargin: 30
  })
  let table3 = new PDFTable(doc, {
    bottomMargin: 30
  })
  doc.pipe(fs.createWriteStream(filePATH + fileName))
  doc.image('./static/logo_horisontal.png', { height: 20 })
  doc.moveDown()
  doc.moveDown()
  doc.moveDown()
  doc.moveDown()
  doc.moveDown()
  doc.font('./static/fonts/FiraSans-SemiBold.otf')
    .fontSize(14)
    .text('Информация о заказе')
  doc.moveDown()
  let headerArray = []
  for (let k in head) {
    let objArray = {}
    objArray['key'] = k
    objArray['value'] = head[k]
    headerArray.push(objArray)
  }
  doc.font('./static/fonts/FiraSans-Regular.otf')
    .fontSize(12)
  table
    .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      column: 'key'
    }))
    .setColumnsDefaults({
      headerBorder: 'B',
      align: 'right'
    })
    .addColumns([
      {
        id: 'key',
        header: '',
        align: 'left',
        width: 30
      },
      {
        id: 'value',
        header: '',
        width: 320
      }
    ])
  table.addBody(headerArray)
  doc.moveDown()
  let customerArray = []
  for (let k in customer) {
    let objArray = {}
    objArray['key'] = k
    objArray['value'] = customer[k]
    customerArray.push(objArray)
  }
  table2
    .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      column: 'key'
    }))
    .setColumnsDefaults({
      align: 'right'
    })
    .addColumns([
      {
        id: 'key',
        header: '',
        align: 'left',
        width: 30
      },
      {
        id: 'value',
        header: '',
        width: 320
      }
    ])
  table2.addBody(customerArray)
  doc.moveDown()
  let techcustomerArray = []
  for (let k in techcustomer) {
    let objArray = {}
    objArray['key'] = k
    objArray['value'] = (techcustomer[k]) ? techcustomer[k] : 'Не заполнено'
    techcustomerArray.push(objArray)
  }
  doc.font('./static/fonts/FiraSans-Regular.otf')
    .fontSize(12)
  table3
    .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      column: 'key'
    }))
    .setColumnsDefaults({
      align: 'right'
    })
    .addColumns([
      {
        id: 'key',
        header: '',
        align: 'left',
        width: 30
      },
      {
        id: 'value',
        header: '',
        width: 320
      }
    ])
  table3.addBody(techcustomerArray)
  doc.moveDown()
  let managerArray = []
  for (let k in manag) {
    let objArray = {}
    objArray['key'] = k
    objArray['value'] = manag[k]
    managerArray.push(objArray)
  }
  doc.font('./static/fonts/FiraSans-Regular.otf')
    .fontSize(12)
  table4
    .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      column: 'key'
    }))
    .setColumnsDefaults({
      align: 'right'
    })
    .addColumns([
      {
        id: 'key',
        header: '',
        align: 'left',
        width: 30
      },
      {
        id: 'value',
        header: '',
        width: 320
      }
    ])
  table4.addBody(managerArray)
  doc.moveDown()
  doc.addPage()
  doc.font('./static/fonts/FiraSans-SemiBold.otf')
    .fontSize(14)
    .text('Спецификация')
  doc.moveDown()
  let p = 1
  let bodyArray = []
  for (let k in order) {
    let objArray = {}
    objArray['id'] = p
    objArray['key'] = k + ':  '
    objArray['value'] = order[k]
    bodyArray.push(objArray)
    p++
  }
  doc.font('./static/fonts/FiraSans-Regular.otf')
    .fontSize(12)
  table5
    .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      column: 'id'
    }))
    .setColumnsDefaults({
      headerBorder: 'B',
      align: 'right'
    })
    .addColumns([
      {
        id: 'id',
        header: '№',
        align: 'left',
        width: 10
      },
      {
        id: 'key',
        header: 'Комплектующие',
        width: 200
      },
      {
        id: 'value',
        header: '',
        width: 250
      }
    ])
    .onPageAdded(function (tb) {
      tb.addHeader()
    })
  table5.addBody(bodyArray)
  doc.moveDown()
  doc.moveDown()
  doc.moveDown()
  doc.font('./static/fonts/FiraSans-SemiBold.otf')
    .fontSize(14)
    .text('Подсистема хранения',
      {
        align: 'left'
      })
  doc.moveDown()
  let disksArray = []
  for (let d in disks) {
    let objArray = {}
    objArray['key'] = _.keys(disks[d])
    objArray['value'] = _.values(disks[d])
    disksArray.push(objArray)
  }
  doc.font('./static/fonts/FiraSans-Regular.otf')
    .fontSize(12)
  table6
    .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      column: 'key'
    }))
    .setColumnsDefaults({
      headerBorder: 'B',
      align: 'right'
    })
    .addColumns([
      {
        id: 'key',
        header: '',
        align: 'left',
        width: 10
      },
      {
        id: 'value',
        header: '',
        width: 300
      }
    ])
  table6.addBody(disksArray)
  doc.end()
  console.log(new Date() + ' generate  ' + fileName)
  return fileName
}
