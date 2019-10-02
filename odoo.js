const Odoo = require('odoo-connect')
const odoo = new Odoo({
  host: '192.168.54.204',
  port: 8070
})
const cred = {
  database: 'talmer',
  username: 'admin',
  password: 'P@$$w0rd'
}

module.exports.getJSON = async function (file) {
  const servers = await getBOM()
  const components = await getBOMLines()
  const component = await getProductProduct()
  const attributes = await getProductAttribute()
  const categoryAttr = await getAttributeCategory()
  const categoryProd = await getProductCategory()
  const attributeValues = await getAttributeValues()
  const template = await getProductTemplate()
  const find = await getProductLine()
  console.log(new Date() + '' + file + ' add to list')
  let exportFile = []
  if (file === 'servers') {
    servers.forEach(element => {
      let fObj = {}
      let fArray = []
      fObj['id'] = element['id']
      fObj['name'] = element['display_name']
      element['bom_line_ids'].forEach(el => {
        let cObj = {}
        let result = components.filter(obj => {
          return obj['id'] === el
        })
        result = result[0]
        let fComponent = component.filter(obj => {
          return obj['id'] === result['product_id'][0]
        })
        fComponent = fComponent[0]
        if (fComponent) {
          if (typeof fComponent['name'] !== 'undefined') {
            cObj['name'] = fComponent['name']
          }
          let fCategory = categoryProd.filter(obj => {
            return obj['id'] === fComponent['categ_id'][0]
          })
          fCategory = fCategory[0]
          if (fCategory) {
            if (typeof fCategory['name'] !== 'undefined') {
              cObj['category'] = fCategory['name']
            }
          }
          let cArray = []
          fComponent['attribute_value_ids'].forEach(el => {
            let attrObj = {}
            let result = attributeValues.filter(obj => {
              return obj['id'] === el
            })
            result = result[0]
            let attrID = attributes.filter(obj => {
              return obj['id'] === result['attribute_id'][0]
            })
            attrID = attrID[0]
            let attrCat = categoryAttr.filter(obj => {
              return obj['id'] === result['category_id'][0]
            })
            attrCat = attrCat[0]
            attrObj['category'] = attrCat['name']
            let attrParentCat = categoryAttr.filter(
              obj => {
                return (
                  obj['id'] === attrCat['parent_id'][0]
                )
              })
            if (attrParentCat && attrParentCat[0]) {
              attrParentCat = attrParentCat[0]
              attrObj['parent_category'] = attrParentCat['name']
            } else {
              attrObj['parent_category'] = false
            }
            attrObj['name'] = attrID['name']
            attrObj['value'] = result['name']
            cArray.push(attrObj)
          })
          cObj['attributes'] = cArray
          fArray.push(cObj)
        }
      })
      fObj['components'] = fArray
      exportFile.push(fObj)
    })
  }
  if (file === 'processors') {
    let template2 = template.filter(obj => {
      return obj['categ_id'][0] === 10
    })
    template2.forEach(element => {
      let fObj = {}
      let fArray = []
      fObj['id'] = element['id']
      fObj['name'] = element['name']
      element['attribute_line_ids'].forEach(async el => {
        let attrObj = {}
        let result = find.filter(obj => {
          return obj['id'] === el
        })
        result = result[0]
        let valueAttr = attributeValues.filter(obj => {
          return obj['id'] === result['value_ids'][0]
        })
        valueAttr = valueAttr[0]
        attrObj['name'] = result['display_name']
        attrObj['category'] = valueAttr['category_id'][1]
        attrObj['value'] = valueAttr['name']
        fArray.push(attrObj)
      })
      fObj['attributes'] = fArray
      exportFile.push(fObj)
    })
  }
  if (file === 'disks') {
    let template2 = template.filter(obj => {
      return obj['categ_id'][0] === 11
    })
    template2.forEach(element => {
      let fObj = {}
      let fArray = []
      fObj['id'] = element['id']
      fObj['name'] = element['name']
      element['attribute_line_ids'].forEach(async el => {
        let attrObj = {}
        let result = find.filter(obj => {
          return obj['id'] === el
        })
        result = result[0]
        let valueAttr = attributeValues.filter(obj => {
          return obj['id'] === result['value_ids'][0]
        })
        valueAttr = valueAttr[0]
        attrObj['name'] = result['display_name']
        attrObj['category'] = valueAttr['category_id'][1]
        attrObj['value'] = valueAttr['name']
        fArray.push(attrObj)
      })
      fObj['attributes'] = fArray
      exportFile.push(fObj)
    })
  }
  return JSON.stringify(exportFile)
}
async function getBOM () {
  let servers
  await odoo.connect(cred).then(client => {
    return client.searchRead('mrp.bom', [['type', '=', 'phantom']], {
      select: ['display_name', 'bom_line_ids'],
      limit: 500
    })
  }).then(async result => {
    servers = result
  })
  return servers
}

async function getBOMLines () {
  let components
  await odoo.connect(cred).then(client => {
    return client.searchRead('mrp.bom.line', [['id', '>', '0']], {
      select: ['id', 'product_id'],
      limit: 9999
    })
  }).then(async result => {
    components = result
  })
  return components
}

async function getProductProduct () {
  let result
  await odoo.connect(cred).then(async client => {
    return client.searchRead('product.product', [['id', '>', '0']], {
      select: ['name', 'attribute_value_ids', 'categ_id'],
      limit: 9999
    })
  }).then(component => {
    result = component
  })
  return result
}
async function getProductAttribute (id) {
  let result
  await odoo.connect(cred).then(async client => {
    return client.searchRead('product.attribute', [['id', '>', '0']], {
      select: ['name'],
      limit: 9999
    })
  }).then(elements => {
    result = elements
  })
  return result
}
async function getAttributeCategory (id) {
  let result
  await odoo.connect(cred).then(async client => {
    return client.searchRead(
      'product.attribute.category',
      [['id', '>', '0']],
      {
        select: ['name', 'parent_id'],
        limit: 9999
      }
    )
  }).then(elements => {
    result = elements
  })
  return result
}
async function getProductCategory () {
  let result
  await odoo.connect(cred).then(async client => {
    return client.searchRead('product.category', [['id', '>', '0']], {
      select: ['name'],
      limit: 9999
    })
  }).then(elements => {
    result = elements
  })
  return result
}
async function getAttributeValues () {
  let result
  await odoo.connect(cred).then(async client => {
    return client.searchRead(
      'product.attribute.value',
      [['id', '>', '0']],
      {
        select: ['name', 'display_name', 'attribute_id', 'category_id'],
        limit: 9999
      }
    )
  }).then(elements => {
    result = elements
  })
  return result
}
async function getProductTemplate () {
  let result
  await odoo.connect(cred).then(async client => {
    return client.searchRead('product.template', [['id', '>', '0']], {
      select: ['name', 'attribute_line_ids', 'categ_id'],
      limit: 9999
    })
  }).then(component => {
    result = component
  })
  return result
}
async function getProductLine () {
  let result
  await odoo.connect(cred).then(async client => {
    return client.searchRead('product.attribute.line', [['id', '>', '0']], {
      select: ['name', 'display_name', 'attribute_id', 'value_ids'],
      limit: 99999
    })
  }).then(component => {
    result = component
  })
  return result
}
