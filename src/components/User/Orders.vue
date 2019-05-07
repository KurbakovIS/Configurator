<template>
  <v-container>
    <h1 class="text--secondary mb-3 text-xs-center">Личный кабинет</h1>

    <v-layout row justify-center>

      <v-flex lg4 >
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
            height="300px"
            v-model="drawer"
          >
            <v-layout
              column
              fill-height
            >
              <v-card-title>
                <!--                <v-btn dark icon>-->
                <!--                  <v-icon>chevron_left</v-icon>-->
                <!--                </v-btn>-->

                <v-spacer></v-spacer>
                <app-update-modal :id="getUser._id"
                                  :firstName="getUser.FirstName"
                                  :secondName="getUser.SecondName"
                                  :lastName="getUser.lastName"
                                  :phone="getUser.mobile"
                                  :email="getUser.email"
                                  :workEmail="getUser.work_email"
                                  :workPhone="getUser.phone"
                                  :addres="getUser.address"
                ></app-update-modal>
              </v-card-title>
              <v-spacer></v-spacer>

              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">{{getCompany.name}}</div>
              </v-card-title>
            </v-layout>
          </v-img>
          <v-list two-line>

            <v-card class="primary">
              <v-layout row align-center justify-center>
                <v-flex lg8 md10>
                  <v-list-tile @click="">
                    <v-list-tile-action>
                      <v-icon color="white"> person_pin</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content style="color: white">
                      <v-list-tile-title>
                        {{getManager.firstName}} {{getManager.secondName}} {{getManager.lastName}}
                      </v-list-tile-title>
                      <v-list-tile-sub-title style="color: white">Персональный менеджер</v-list-tile-sub-title>
                    </v-list-tile-content>

                  </v-list-tile>

                  <v-divider inset></v-divider>
                  <v-list-tile @click="">
                    <v-list-tile-action>
                      <v-icon color="white">phone</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title style="color: white">{{getManager.phone}}</v-list-tile-title>
                      <v-list-tile-sub-title style="color: white">Мобильный</v-list-tile-sub-title>
                    </v-list-tile-content>

                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-list-tile @click="">
                    <v-list-tile-action>
                      <v-icon color="white">mail</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title style="color: white">{{getManager.email}}</v-list-tile-title>
                      <v-list-tile-sub-title style="color: white">Email</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex lg4 md2>
                  <v-img src="http://configurator.talmer.ru/static/img/logo-white.png"
                         height="160px"
                         contain></v-img>
                </v-flex>
              </v-layout>
            </v-card>

            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo"> person_pin</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{getUser.FirstName}} {{getUser.SecondName}} {{getUser.LastName}}
                </v-list-tile-title>
                <v-list-tile-sub-title>ФИО</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>

            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">phone</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{getUser.mobile}}</v-list-tile-title>
                <v-list-tile-sub-title>Мобильный</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>

            <v-list-tile @click="">
              <v-list-tile-action></v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{getUser.phone}}</v-list-tile-title>
                <v-list-tile-sub-title>Рабочий</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">mail</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{getUser.email}}</v-list-tile-title>
                <v-list-tile-sub-title>Персональный email</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="">
              <v-list-tile-action></v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{getUser.work_email}}</v-list-tile-title>
                <v-list-tile-sub-title>Рабочий email</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">location_on</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{getUser.address}}</v-list-tile-title>
                <v-list-tile-sub-title>Адрес</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex  lg8  class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple">
        </v-progress-circular>
      </v-flex>

      <v-flex lg8
              offset-sm1
              v-else-if="!loading && getOrdersClient"
      >
        <v-list
          subheader
          two-line
        >
          <v-layout row>
            <v-flex xs2  lg2 class="text-lg-center">
              <v-card-text>
                № заявки
              </v-card-text>
            </v-flex>
            <v-flex xs2  lg2 class="text-lg-center ">
              <v-card-text>
                Дата заказа
              </v-card-text>
            </v-flex>
            <v-flex xs4 lg4 class="text-lg-center ">
              <v-card-text>
                ФИО сотрудника осуществившего заявку
              </v-card-text>
            </v-flex>
            <v-flex xs3 lg4 class="text-lg-center">
              <v-card-text>
                Спецификации заявки
              </v-card-text>
            </v-flex>
            <v-flex xs2 lg2 class="text-lg-center">
              <v-card-text>
                Заказать повторно
              </v-card-text>
            </v-flex>
          </v-layout>


          <v-expansion-panel v-for="order in getOrdersClient"
                             :key="order.id"
                             class="mb-2"
                             style="position: relative;z-index: 0">
            <v-layout style="position: absolute; z-index: 1;right: 1em;top: 1em ">
              <v-flex xs1>
                <app-copy-modal :id="order._id"></app-copy-modal>
              </v-flex>
            </v-layout>
            <v-expansion-panel-content>
              <v-icon slot="actions" color="teal" class="mr-5">done</v-icon>

              <v-layout row lg12 md12 slot="header"
              >
                <v-flex lg2 md2>
                  <v-card-text>
                    <v-list-tile-title>
                      {{order.order_id}}
                    </v-list-tile-title>
                  </v-card-text>
                </v-flex>
                <v-flex lg2 md2>
                  <v-card-text>
                    <v-list-tile-sub-title>
                      {{order.position[0].server_date.toString().split('-')[2].split('T')[0]}}.
                      {{order.position[0].server_date.split('-')[1]}}.
                      {{order.position[0].server_date.split('-')[0]}}
                    </v-list-tile-sub-title>
                  </v-card-text>
                </v-flex>
                <v-flex lg5 md3 class="text-xs-left">
                  <v-card-text>
                    <v-list-tile-sub-title>
                      {{order.customer.fullName}}
                    </v-list-tile-sub-title>
                  </v-card-text>
                </v-flex>
                <v-flex lg4 md2 align-self-center class="text-lg-right">
                  <v-card-actions>
                    <v-list-tile-action>
                      <v-btn class="primary pr-2 pl-2" small> Просмотреть заказ</v-btn>
                    </v-list-tile-action>

                  </v-card-actions>
                </v-flex>


              </v-layout>

              <v-card v-for="tovar in order.position" class="mb-1">
                <v-layout md12 flex>
                  <v-flex lg3 md3 class="text-xs-center">
                    <v-card-text class="grey lighten-3 " style="padding-left: 40px">
                      {{tovar.position_id}}
                    </v-card-text>
                  </v-flex>
                  <v-flex lg2 md2 class="text-xs-center">
                    <v-card-text class="grey lighten-3">
                      {{tovar.server_date.toString().split('-')[2].split('T')[0]}}.
                      {{tovar.server_date.toString().split('-')[1]}}.
                      {{tovar.server_date.toString().split('-')[0]}}
                    </v-card-text>
                  </v-flex>
                  <v-flex lg6 md6 class="text-xs-left ">
                    <v-card-text class="grey lighten-3">
                      {{order.customer.fullName}}
                    </v-card-text>
                  </v-flex>
                  <v-flex lg4 md2>
                    <v-card-actions class="grey lighten-3">
                      <v-btn class=" pr-2 pl-2 mr-2" @click="getPDF(tovar.position_id)">
                        <v-icon>picture_as_pdf</v-icon>
                      </v-btn>

                    </v-card-actions>

                  </v-flex>


                </v-layout>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-list>
        <v-btn class="right primary" :to="'/allOrder/'+getCompany._id">Все заказы компании</v-btn>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-else>
        <h1 class="text--secondary"> У вас нет заказов</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Orders",

    data() {
      return {
        drawer: false
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      getOrdersClient() {
        return this.$store.getters.ordersClient
      },
      getUser() {
        return this.$store.getters.getClient[0];
      },
      getCompany() {
        return this.$store.getters.getCompany
      },
      getManager() {
        return this.$store.getters.getManager
      }
    },
    methods: {
      copy($id) {
        axios({
          url: `http://configurator.talmer.ru/api/dublicateOrder/${$id}`,
          method: 'POST',
          responseType: 'blob',
        }).then((response) => {
          this.$store.dispatch('getOrdersClientJson', this.$store.getters.user.id)
          console.log(response.data);
        });
      },
      getPDF($id) {
        axios({
          url: `http://configurator.talmer.ru/api/pdf/${$id}`,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf');
          document.body.appendChild(link);
          link.click();
        });
      },
    },
    created() {
      this.$store.dispatch('getOrdersClientJson', this.$store.getters.user.id)
        .then(() => {
          this.$store.dispatch('getGetUserJson', this.$store.getters.user.id)
        })

    },

  }
</script>

<style scoped>

</style>
