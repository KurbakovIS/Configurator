<template>
  <v-container fluid grid-list-md>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple">
        </v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else-if="!loading">
      <v-flex lg10>
        <h1 class="text-xs-center display-1 mb-2">{{typeCategory[this.id]}}</h1>
      </v-flex>


      <v-flex d-flex xs3 child-flex class="mt-4">

        <v-flex color="green lighten-2" dark>
          <details>
            <summary>Модельный ряд</summary>
            <v-container fluid class="pb-0">
              <v-checkbox v-for="model in filters['processors_Model']"
                          :label="model.replace('ый','ые')+'а'"
                          :value='model'
                          v-model="adsVolumeProc"
                          :key="model"
                          height="1px"
                          class="mt-0 pb-0"></v-checkbox>
            </v-container>
          </details>

          <details>
            <summary>Линейка процессоров</summary>
            <v-container fluid class="pb-0">
              <template v-for="element in filters['processors_Lines']">

                <v-checkbox v-for="(proc,key,i) in element"
                            :label="key"
                            :value='key'
                            v-model="lineProcArr"
                            height="1px"
                            class="mt-0 pb-0"
                            @change="getProcLine()"
                >

                </v-checkbox>
              </template>
            </v-container>
          </details>

          <details>
            <summary>Максимальный объем оперативной памяти</summary>
            <v-container fluid class="pb-0">

              <v-flex xs9 md10>
                <v-slider
                  v-model="asdMemorys"
                  :tick-labels="filters['max_Memory']"
                  :max="getMaxMemory"
                  step="1"
                  ticks="always"
                  tick-size="3"
                  class="mt-0"
                ></v-slider>

              </v-flex>
            </v-container>

          </details>

          <details>
            <summary>Дисковые корзины </summary>
            <v-container fluid class="pb-0">
              <template v-for="(proc,key,i) in filters['disks_Array']">
                <v-checkbox :label="key"
                            :value='key'
                            v-model="disksCart"
                            :key="i"
                            height="1px"
                            class="mt-2 pb-0">
                </v-checkbox>
                <v-flex xs9 md10>
                  <v-layout row>
                    <v-slider
                      :tick-labels="proc"
                      :max="proc.length-1"
                      v-model="disksCartCount[key]"
                      step="1"
                      ticks="always"
                      tick-size="3"
                      class="mt-0"
                      :label="key"
                      v-if="disksCart.includes(key)"
                    >
                    </v-slider>
                  </v-layout>
                  <v-divider></v-divider>
                </v-flex>
                <!--                {{disksCartCount}}-->
                <!--                {{disksCart}}-->
              </template>

            </v-container>

          </details>

          <!--          <details>-->
          <!--            <summary>Форм-фактор сервера</summary>-->
          <!--            <v-container fluid class="pb-0">-->
          <!--              <v-checkbox v-for="factor in filters['formFactor']"-->
          <!--                          :label="factor"-->
          <!--                          :value='factor'-->
          <!--                          v-model="formFactor"-->
          <!--                          height="1px"-->
          <!--                          :key="factor"-->
          <!--                          class="mt-0 pb-0"-->
          <!--              ></v-checkbox>-->
          <!--            </v-container>-->
          <!--          </details>-->

          <details>
            <summary>Сетевой контроллер</summary>
            <v-container fluid class="pb-0">
              <v-checkbox v-for="controller in filters['lan_controller']"
                          :label="controller"
                          :value='controller'
                          v-model="network"
                          height="1px"
                          class="mt-0 pb-0"></v-checkbox>
            </v-container>
          </details>
        </v-flex>
      </v-flex>

      <v-flex d-flex xs9>
        <!--        <v-container grid-list-lg align-content-start justify-start>-->

        <v-layout align-start justify-start row wrap>
          <v-flex
            v-for="(ad,i) of filterAds"
            :key="ad.id"
            xs3
          >

            <v-card>
              <v-img
                :src="ad.image"
                aspect-ratio="2.75"
                height="200px"
                contain
              ></v-img>

              <v-card-title>
                <h3 class="headline text-xs-center mb-0">Сервер ТАЛМЕР {{ad.name}}</h3>
                <ul style="min-height: 125px">
                  <li>{{ad.pr_count}}</li>
                  <li>Корпус {{ad.corp}}</li>
                  <li>ОЗУ до {{ad.ram}} Гб.</li>
                  <li v-for="(fixed,key) in ad.dd['fixed']"
                      :key="ad.id"
                      v-if="fixed != 0">
                    Накопители {{key}} форм-фактора
                  </li>
                  <li v-for="(hot_swap,key) in ad.dd['hot_swap']"
                      :key="ad.id"
                      v-if="hot_swap != 0">
                    Накопители {{key}} форм-фактора {{hot_swap}} шт.

                  </li>
                  <template v-for="(fixed) in ad.lan">
                    <li v-for="(param,key,i) in fixed" v-if="param != 0"> {{key}} - {{param}} шт.</li>
                  </template>
                </ul>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-hover>
                  <div slot-scope="{ hover }">
                    <v-btn v-if="!hover" flat class="primary" :to="'/ad/' + ad._id">Заказать</v-btn>
                    <v-btn v-if="hover" flat class="orange lighten-3" :to="'/ad/' + ad._id">Заказать</v-btn>
                  </div>
                </v-hover>
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs12 v-if="filterAdMy == fullJsonMy">
            <v-layout justify-center>
              <v-btn class="align-center primary"
                     style="width: 100%"
                     @click="showAll = true"
                     v-if="!showAll">
                Показать все
              </v-btn>
              <v-btn class="align-center primary"
                     style="width: 100%"
                     @click="showAll = false"
                     v-if="showAll">
                Свернуть
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>

        <!--        </v-container>-->

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    name: "OneCategory",
    props: {
      id: String,
    },
    data() {
      return {
        typeCategory: {
          Rack1U: "1 Unit сервера ТАЛМЕР",
          Rack2U: "2 Unit сервера ТАЛМЕР",
          Rack3U: "3 Unit сервера ТАЛМЕР",
          Rack4U: "4 Unit сервера ТАЛМЕР",
        },
        lineProcArr: [],
        adsVolumeProc: [],
        formFactor: [],
        network: [],
        asdMemorys: '',
        disksCart: [],
        disksCartCount: {'2,5"': 0, '3,5"': 0},
        showAll: false,
        procLiane: [],
        filterAdMy: 0,
        fullJsonMy: 0
      }
    },
    methods: {
      getProcLine() {
        this.procLiane = []
        this.lineProcArr.forEach(element => {
          this.filters['processors_Lines'].filter(proc => {

            if (Object.keys(proc) == element) {
              this.procLiane.push(proc[element])
            }
          })
        })
        // this.filters['processors_Lines'].forEach(element => {
        //   if (element[this.lineProcArr] != undefined) {
        //     this.procLiane.push(element[this.lineProcArr])
        //   }
        // });
        this.procLiane = [...new Set(this.procLiane)];
        console.log(this.procLiane)
      },
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      getMaxMemory() {
        if (this.filters['max_Memory'] == undefined) {
          return 0
        } else {
          return this.filters['max_Memory'].length - 1
        }
      },
      ads() {
        if (this.showAll) {
          return this.$store.getters.oneCategoryFull
        } else {
          return this.$store.getters.oneCategory
        }
      },
      filters() {
        return this.$store.getters.filters
      },
      getOneCategoryFull() {
        return this.$store.getters.oneCategoryFull
      },
      filterAds() {
        let fullJson = this.getOneCategoryFull;

        let filterAd = fullJson
          .filter(ad => {
            if (this.disksCart.length == 0) {
              return this.disksCart.length == 0
            }
            if (this.disksCart.length == 1) {
              for (let key in ad.dd.hot_swap) {
                if (key = this.disksCart[0]) {
                  if (ad.dd.hot_swap[key] != 0 && this.disksCartCount[this.disksCart[0]] != 0) {
                    console.log(this.filters['disks_Array'][key][this.disksCartCount[this.disksCart[0]]])
                    if (ad.dd.hot_swap[key] == this.filters['disks_Array'][key][this.disksCartCount[this.disksCart[0]]]) {
                      return true;
                    }
                  } else if (ad.dd.hot_swap[key] != 0) {
                    return true;
                  }
                }
              }
            } else {
              return Object.keys(ad.dd.hot_swap).some(element => {
                  if (this.disksCartCount[element] != 0) {
                    if (ad.dd.hot_swap[element] == this.filters['disks_Array'][element][this.disksCartCount[element]]) {
                      return true
                    }
                  } else if (ad.dd.hot_swap[element] != 0) {
                    return true
                  }
                }
              )
            }
          })



          // .filter(ad => {
          //   if (this.disksCart.length == 0) {
          //     return this.disksCart.length == 0
          //   } else if (this.disksCart.length == 1) {
          //     return ad.dd.fixed[this.disksCart[0]] ==
          //       this.filters['disks_Array'][this.disksCart[0]][this.disksCartCount[this.disksCart[0]]]
          //   } else {
          //     return this.disksCart == 0 || Object.keys(ad.dd.fixed).some(element =>
          //       ad.dd.fixed[element] == this.filters['disks_Array'][element][this.disksCartCount[element]]
          //     )
          //   }
          // })
          .filter(ad => {
            return this.asdMemorys == 0 || ad.ram == this.filters['max_Memory'][this.asdMemorys]
          })
          .filter(ad => {
            return this.network.length == 0 || ad.lan.some(attribute => this.network.includes(Object.keys(attribute)[0].split('Кол-во портов ')[1]) && attribute[Object.keys(attribute)[0]] != 0);
          })
          .filter(ad => {
            return this.formFactor.length == 0 || this.formFactor.includes(ad.corp)
          })
          .filter(ad => {
            return this.adsVolumeProc.length == 0 || this.adsVolumeProc.includes(ad.pr_count)
          })
          .filter(ad => {
            return this.lineProcArr.length == 0 || this.procLiane.includes(ad.pr_socet)
          });
        // this.filterAds = filterAd.length;
        console.log(filterAd.length);
        console.log(fullJson.length);
        this.filterAdMy = filterAd.length;
        this.fullJsonMy = fullJson.length;
        if (filterAd.length < fullJson.length) {
          return filterAd
        }

        return this.ads
      }
    },
    created() {
      this.$store.dispatch('getOneCategoryJson', this.id);
      this.$store.dispatch('getCategoryFullJson', this.id);

    }
  }
</script>

<style scoped>
  summary {
    cursor: pointer;
  }

  details {
    margin-bottom: 10px;
  }

  .orangeHover:hover {
    background: #ffcc80 !important;
    color: black !important;
    transition: background ease-in-out 0.6s !important;
  }

  .orangeHover:not(:hover) {
    transition: background ease-in-out 0.6s !important;
  }
</style>
