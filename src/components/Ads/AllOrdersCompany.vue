<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm6 md10
              offset-sm1
              v-if="!loading && getOrdersCompany"
      >
        <v-list
          subheader
          two-line
        >
          <v-layout row>
            <v-flex xs2 class="text-xs-center">
              <v-card-text>
                № заявки
              </v-card-text>
            </v-flex>
            <v-flex xs2 class="text-xs-center mr-3">
              <v-card-text>
                Дата заказа
              </v-card-text>
            </v-flex>
            <v-flex xs4 class="text-xs-center ">
              <v-card-text>
                ФИО сотрудника осуществившего заявку
              </v-card-text>
            </v-flex>
            <v-flex xs3 class="text-xs-center">
              <v-card-text>
                Спецификации заявки
              </v-card-text>
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              <v-card-text>
                Заказать повторно
              </v-card-text>
            </v-flex>
          </v-layout>

          <v-expansion-panel v-for="order in getOrdersCompany"
                             :key="order.id"
                             class="mb-2"
                             style="position: relative;z-index: 0">
            <v-layout style="position: absolute; z-index: 1;right: 1em; top: 1em ">
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
                <v-flex lg4 md3 class="text-xs-left">
                  <v-card-text>
                    <v-list-tile-sub-title>
                      {{order.customer.fullName}}
                    </v-list-tile-sub-title>
                  </v-card-text>
                </v-flex>
                <v-flex lg3 md2 align-self-center>
                  <v-card-actions>
                    <v-list-tile-action>
                      <v-btn class="primary pr-2 pl-2"> Просмотреть заказ</v-btn>
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
        <v-btn class="right primary" to="/orders">Вернуться в личный кабинет</v-btn>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-else>
        <h1 class="text--secondary"> У вас нет заказов</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props:['id'],
    name: "AllOrdersCompany",
    data() {
      return {}
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      getOrdersCompany() {
        return this.$store.getters.ordersCompany
      }
    },
    created() {
      this.$store.dispatch('getOrdersCompanyJson', this.id)
    }
  }
</script>

<style scoped>

</style>
