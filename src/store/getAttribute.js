export default {
  state: {},
  mutations: {},
  actions: {},
  getters: {
    getMemory() {
      return (ad) => {
        let memory = {};
        for (let ade in ad.components) {
          let components = ad.components[ade];

          for (let component in components.attributes) {
            let attribute = components.attributes[component];

            if (attribute.name == "Тип памяти SDRAM") {
              memory['typeMemory'] = attribute.value
            }
            if (attribute.category == "Характеристики RAM" && attribute.value == 'да') {
              memory['haracteristikMemory'] = attribute.name
            }
            if (attribute.name == "Тип модуля") {
              memory['typeModul'] = attribute.value
            }
          }
        }
        return memory
      }
    },
    getSelectAllFormFactor() {
      return (valueObjFormFactor) => {
        let sum = 0;
        if (isNaN(sum)) {
          sum = 0;
        }
        for (let i in valueObjFormFactor) {
          sum += +valueObjFormFactor[i]['volume' + (valueObjFormFactor[i]['id'])];
        }

        if (isNaN(sum)) {
          sum = 0
        }
        return sum
      }
    },
  }
}
