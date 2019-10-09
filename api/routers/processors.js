const Processors = require('../../models/processor')
const _ = require('lodash')
module.exports = function (router) {
  router.get('/proccesors/:id', function (req, res) {
    console.log(new Date() + ' request proccesors MongoDB' + ` processor id - ${req.params.id}`)
    Processors.find({ 'id': req.params.id }).exec(function (err, processor) {
      if (err) throw err
      res.send(processor)
    })
  })
  router.get('/proccesorsQuery', function (req, res) {
    Processors.find(req.query).exec(function (err, processors) {
      if (err) throw err
      res.send(processors)
    })
  })
  router.get('/proccesorsQname', async function (req, res) {
    let proccesors = await Processors.find(req.query)
    let processorName = []
    proccesors.forEach(element => {
      processorName.push(element['name'])
    })
    let pr = _.sortedUniq(processorName)
    pr = pr.sort(function (a, b) { return a - b })
    res.send(naturalSort(pr))
  })
  router.get('/proccesorsAll', function (req, res) {
    console.log(new Date() + ' request proccesors MongoDB')
    Processors.find(function (err, allProcessors) {
      if (err) throw err
      res.send(allProcessors)
    })
  })
}

function naturalSort (array, extractor) {
  'use strict'
  // преобразуем исходный массив в массив сплиттеров
  let splitters = array.map(makeSplitter)
  // сортируем сплиттеры
  let sorted = splitters.sort(compareSplitters)
  // возвращаем исходные данные в новом порядке
  return sorted.map(function (splitter) {
    return splitter.item
  })
  // обёртка конструктора сплиттера
  function makeSplitter (item) {
    return new Splitter(item)
  }
  // конструктор сплиттера
  //    сплиттер разделяет строку на фрагменты "ленивым" способом
  function Splitter (item) {
    let index = 0 // индекс для прохода по строке
    let from = 0 // начальный индекс для фрагмента
    let parts = [] // массив фрагментов
    let completed = false // разобрана ли строка полностью
    // исходный объект
    this.item = item
    // ключ - строка
    let key = (typeof (extractor) === 'function')
      ? extractor(item)
      : item
    this.key = key
    // количество найденных фрагментов
    this.count = function () {
      return parts.length
    }
    // фрагмент по индексу (по возможности из parts[])
    this.part = function (i) {
      while (parts.length <= i && !completed) {
        next() // разбираем строку дальше
      }
      return (i < parts.length) ? parts[i] : null
    }
    // разбор строки до следующего фрагмента
    function next () {
      // строка ещё не закончилась
      if (index < key.length) {
        // перебираем символы до границы между нецифровыми символами и цифрами
        while (++index) {
          let currentIsDigit = isDigit(key.charAt(index - 1))
          let nextChar = key.charAt(index)
          let currentIsLast = (index === key.length)
          // граница - если символ последний,
          // или если текущий и следующий символы разнотипные (цифра / не цифра)
          let isBorder = currentIsLast ||
            xor(currentIsDigit, isDigit(nextChar))
          if (isBorder) {
            // формируем фрагмент и добавляем его в parts[]
            let partStr = key.slice(from, index)
            parts.push(new Part(partStr, currentIsDigit))
            from = index
            break
          } // end if
        } // end while
        // строка уже закончилась
      } else {
        completed = true
      } // end if
    } // end next
    // конструктор фрагмента
    function Part (text, isNumber) {
      this.isNumber = isNumber
      this.value = isNumber ? Number(text) : text
    }
  }
  // сравнение сплиттеров
  function compareSplitters (sp1, sp2) {
    let i = 0
    do {
      let first = sp1.part(i)
      let second = sp2.part(i)
      // если обе части существуют ...
      if (first !== null && second !== null) {
        // части разных типов (цифры либо нецифровые символы)
        if (xor(first.isNumber, second.isNumber)) {
          // цифры всегда "меньше"
          return first.isNumber ? -1 : 1
          // части одного типа можно просто сравнить
        } else {
          let comp = compare(first.value, second.value)
          if (comp !== 0) {
            return comp
          }
        } // end if
        // ... если же одна из строк закончилась - то она "меньше"
      } else {
        return compare(sp1.count(), sp2.count())
      }
    } while (++i)
    // обычное сравнение строк или чисел
    function compare (a, b) {
      return (a < b) ? -1 : (a > b) ? 1 : 0
    };
  }
  // логическое исключающее "или"
  function xor (a, b) {
    return a ? !b : b
  }
  // проверка: является ли символ цифрой
  function isDigit (chr) {
    let code = charCode(chr)
    return (code >= charCode('0')) && (code <= charCode('9'))
    function charCode (ch) {
      return ch.charCodeAt(0)
    }
  }
}
