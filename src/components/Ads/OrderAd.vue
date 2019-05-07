<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center pt-5">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple">
        </v-progress-circular>
      </v-flex>
    </v-layout>

    <v-card v-if="!loading && getOneCart">
      <v-card-title primary-title>
        <v-container>
          <v-layout wrap>

            <h2 class="headline mb-0">Выбранные параметры сервера</h2>

            <v-card-text>
              <v-layout wrap>
                <v-flex xs6 align-self-center>
                  <p class="title">Наименование компонента</p>
                </v-flex>
                <v-flex xs4>
                  <p class="title">Выбранный элемент</p>
                </v-flex>
                <v-flex xs2>
                  <p class="title">Количество</p>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider inset></v-divider>

            <v-card-text v-for="(element,key) in getAttribute">
              <v-layout wrap align-center>
                <v-flex xs6 align-self-center>
                  <v-subheader v-if="element.category == 'Системный накопитель'">{{element.category}}</v-subheader>
                  <v-subheader v-else>{{element.name}}</v-subheader>
                </v-flex>

                <v-flex xs4>
                  {{element.value && element.value!=0 ? element.value :'-'}}
                </v-flex>

                <v-flex xs2 v-if="element.category == 'Системный накопитель'">
                  <v-card-text>
                    {{getAttribute[3].value}} ГБ / {{getAttribute[3].count}} шт.
                  </v-card-text>
                </v-flex>
                <v-flex xs2 v-else>
                  <v-card-text>
                    {{element.count}} шт.
                  </v-card-text>
                </v-flex>

              </v-layout>
            </v-card-text>
            <v-divider inset></v-divider>

            <template v-for="transiver in getAttribute" v-if="transiver.name == 'Трансивер'">
              <v-card-text>
                <v-layout wrap align-center>
                  <v-flex xs6 align-self-center>
                    <v-subheader>Трансивер сетевой карты</v-subheader>
                  </v-flex>
                  <v-flex xs4>
                    {{transiver['value']}}
                  </v-flex>
                  <v-flex xs2>
                    <v-card-text>
                      {{transiver['count']}} шт.
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </template>
            <v-divider inset></v-divider>

            <template v-for="transiverHba in getAttribute" v-if="transiverHba.name == 'Hba Трансивер'">
              <v-card-text>
                <v-layout wrap align-center>
                  <v-flex xs6 align-self-center>
                    <v-subheader>Трансивер HBA</v-subheader>
                  </v-flex>
                  <v-flex xs4>
                    {{transiverHba['value']}}
                  </v-flex>
                  <v-flex xs2>
                    <v-card-text>
                      {{transiverHba['count']}} шт.
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </template>
            <v-divider inset></v-divider>

          </v-layout>
        </v-container>
      </v-card-title>

      <v-card-title primary-title>
        <v-container>
          <v-layout wrap>

            <v-layout align-self-center row>
              <v-flex xs4>
                <v-subheader>Подсистемы хранения</v-subheader>
              </v-flex>
              <v-flex xs2>
                <v-subheader>Форм-Фактор</v-subheader>
              </v-flex>
              <v-flex xs2>
                <v-subheader>Интерфейс</v-subheader>
              </v-flex>
              <v-flex xs2>
                <v-subheader>Объем</v-subheader>
              </v-flex>
              <v-flex xs1 class="text-xs-center">
                <v-subheader>Количество</v-subheader>
              </v-flex>
            </v-layout>
            <v-card-text v-for="element in getOneCart.disks" class="ml-5">
              <v-layout wrap align-center>
                <v-flex xs4 align-self-center>
                  <v-subheader>Системные накопители</v-subheader>
                </v-flex>
                <v-flex xs2>
                  {{element.form}}
                </v-flex>
                <v-flex xs2>
                  {{element.interface}}
                </v-flex>
                <v-flex xs2>
                  {{element.value}} ГБ.
                </v-flex>
                <v-flex xs1 class="text-xs-center">
                  {{element.count}} шт.
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider inset></v-divider>
            <v-card-text>
              <v-layout wrap align-center>
                <v-flex xs4 align-self-center>
                  <v-subheader>Комментарий</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-card-text>
                    {{getOneCart.comments_position}}
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider inset></v-divider>

          </v-layout>
        </v-container>
      </v-card-title>

      <v-btn class="right grey" to="/list">Вернуться в корзину</v-btn>
      <v-btn class="right primary" @click="updateCart()">Сохранить изменения</v-btn>
      {{count}}
      <v-flex class="right">
        <v-text-field
          style=" width:80px"
          label="количество"
          class="mr-4"
          :placeholder="getOneCart.count_position"
          v-model="count"
          type="number"
          min="1"
          suffix="шт."
          single-line
        ></v-text-field>
      </v-flex>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        count: this.getOneCart.count_position
      }
    },
    methods: {
      updateCart() {
        let data = {
          count: this.count,
        };
        this.$store.dispatch('updateCart', {id: this.getOneCart._id, data: data}).finally(() => {
          this.$router.push('/list');
        });
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      getAttribute() {
        return this.getOneCart.attributes
      },
      getOneCart() {
        return this.$store.getters.oneCart
      },
    },
    created() {
      this.$store.dispatch('getOneCartJson', this.id);
    }
  }
</script>

<style scoped>

</style>
