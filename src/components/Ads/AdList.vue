<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple">
        </v-progress-circular>
      </v-flex>

      <!--      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">-->
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && getTovars.length != 0">
        <h1 class="text--secondary mb-3">Список товаров</h1>
        <v-card>
          <v-layout row align-center justify-center>
            <v-flex xs1 lg2 class="text-lg-center text-xs-center"> № п/п</v-flex>
            <v-flex xs5 lg4 class="text-lg-center text-xs-center"> Наименование оборудования</v-flex>
            <v-flex xs2 lg1 class="text-lg-center text-xs-center">Количество</v-flex>
            <v-flex xs1 lg3 class="text-lg-center text-xs-center">Посмотреть заказ</v-flex>
            <v-flex xs1 lg1 class="text-lg-center text-xs-center">Сохранить</v-flex>
            <v-flex xs2 lg2 class="text-lg-center text-xs-center">Удалить</v-flex>
          </v-layout>
        </v-card>
        <v-card class="mt-2"
                v-for="(tovar,number) in getTovars"

        >
          <v-layout row align-center justify-center style="height: 60px">
            <v-flex xs1 lg2 class="text-lg-center text-xs-center">{{number+1}}</v-flex>
            <v-flex xs5 lg4 class="text-lg-center text-xs-center">{{tovar.server_name}}</v-flex>
            <v-flex xs2 lg1 class="text-lg-center text-xs-center mr-3">
              <v-text-field
                type="number"
                align-center
                v-model="tovar.count_position"
                min="0"
              ></v-text-field>

            </v-flex>

            <v-flex xs1 lg3 class="text-lg-center text-xs-center">
              <v-btn :to="'/OrderAd/' + tovar._id" small>Посмотреть заказ</v-btn>
            </v-flex>
            <v-flex xs1 lg1 class="text-lg-center text-xs-center">
              <v-btn @click="sendUpdate(tovar)">Сохранить</v-btn>
            </v-flex>
            <v-flex xs2 lg2 class="text-lg-center text-xs-center">
              <v-icon @click="deleteTovar(tovar._id)">delete_forever</v-icon>
            </v-flex>
          </v-layout>
        </v-card>


        <form class="mt-4" style="max-width: 600px">
          <v-card-title primary-title>
            <h4>Информация о заказчике(* - обязательные поля)</h4>
          </v-card-title>
          <v-text-field
            solo
            v-model="name"
            :value="createName"
            :error-messages="nameErrors"
            placeholder="Фамилия Имя Отчество *"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            solo
            v-model="email"
            :value="createMail"
            :error-messages="emailErrors"
            placeholder="E-mail *"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            :mask="maskPhone"
            solo
            :value="createPhone"
            v-model="phone"
            :error-messages="phoneErrors"
            placeholder="Телефон *"
            required
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
          ></v-text-field>

          <v-card-title primary-title>
            <h4>Ответственный по технчиеской части состороны заказчика(не обязательно)</h4>
          </v-card-title>
          <v-text-field
            solo
            v-model="techniqueName"
            placeholder="Фамилия Имя Отчество"
            required
          ></v-text-field>
          <v-text-field
            solo
            v-model="techniqueEmail"
            placeholder="E-mail"
            required
          ></v-text-field>

          <v-text-field v-model="maskPhone" v-if="false"></v-text-field>
          <v-text-field
            :mask="maskPhone"
            solo
            v-model="techniquePhone"
            placeholder="Телефон"
            required
          ></v-text-field>

          <v-text-field
            solo
            :value="createAdres"
            v-model="adres"
            placeholder="Адрес доставки"
            required
          ></v-text-field>
          <v-flex>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Желаемая дата доставки"
                  persistent-hint
                  prepend-icon="event"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-textarea
            solo
            v-model="comment"
            placeholder="Поле коментариев"
            required
          >

          </v-textarea>
          <v-btn v-if="name && email && phone"
                 class="right primary"
                 @click="sendOrder(getJsonBuy())"
          >
            Разместить заявку
          </v-btn>
          <v-card-text v-else
                       class="right "
                       style="color: red"
                       @click="sendOrder(getJsonBuy())"
          >
            Заполните обязательные поля
          </v-card-text>
        </form>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-else>

        <h1 class="text--secondary"> У вас нет товаров в списке </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: "Orders",
    validations: {
      name: {required},
      email: {required, email},
      phone: {required},
    },
    mixins: [validationMixin],
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        menu2: false,
        maskPhone: 'phone',
        name: '',
        email: '',
        phone: '',
        techniqueName: '',
        techniqueEmail: '',
        techniquePhone: '',
        adres: '',
        comment: '',
        countTovar: '',
      }
    },
    watch: {
      date(val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    computed: {
      computedDateFormatted() {
        return this.formatDate(this.date)
      },
      loading() {
        return this.$store.getters.loading
      },
      nameErrors() {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.required && errors.push('Необходимо заполнить поле');
        return errors
      },
      phoneErrors() {
        const errors = [];
        if (!this.$v.phone.$dirty) return errors;
        !this.$v.phone.required && errors.push('Необходимо указать номер телефона');
        return errors
      },
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Введен некорректный e-mail');
        !this.$v.email.required && errors.push('Необходимо заполнить E-mail');
        return errors
      },
      getTovars() {
        return this.$store.getters.tovar
      },
      getUser() {
        return this.$store.getters.getClient[0];
      },
      createName() {
        if (this.getUser) {
          this.name = `${this.getUser.FirstName} ${this.getUser.SecondName != undefined ? this.getUser.SecondName : ''} ${this.getUser.LastName}`
        }
      },
      createMail() {
        if (this.getUser) {
          this.email = `${this.getUser.work_email}`
        }
      },
      createPhone() {
        if (this.getUser) {
          this.phone = `${this.getUser.phone}`
        }
      },
      createAdres() {
        if (this.getUser) {
          this.adres = `${this.getUser.address}`
        }
      }
    },
    methods: {
      sendUpdate(tovar) {
        let data = {
          count: tovar.count_position,
        };
        console.log('Отдаю ' + tovar._id, data);
        this.$store.dispatch('updateCart', {id: tovar._id, data: data}).finally(() => {
          this.$store.dispatch('getTovarsJson', this.$store.getters.user.id)
          this.$router.push('/list')
        });
      },
      formatDate(date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`
      },
      parseDate(date) {
        if (!date) return null;

        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      async deleteTovar(id) {
        try {
          this.$store.dispatch('deleteTovar', id).finally(() => {
            this.$store.dispatch('getTovarsJson', this.$store.getters.user.id);
            // this.$router.go()
            this.$router.push('/list')
          });

        } catch (e) {
          console.log(e)
        }
      },
      sendOrder(data) {
        try {
          this.$store.dispatch('sendOrders', data);
          this.$store.dispatch('getOrdersClientJson', this.$store.getters.user.id);
          this.$store.dispatch('cleanCart', this.$store.getters.user.id);
          this.$router.push('/orders');
        } catch (e) {
          console.log(e)
        }

      },
      getJsonBuy() {
        let parseDate = this.dateFormatted.split('/'),
          date = new Date(parseDate[2], parseDate[1], parseDate[0]);

        let servBuy = {
          user_id: `${this.$store.getters.user.id}`,
          customer: {
            fullName: `${this.name}`,
            email: `${this.email}`,
            phone: `${this.phone}`
          },
          tech_customer: {
            fullName: `${this.techniqueName}`,
            email: `${this.techniqueEmail}`,
            phone: `${this.techniquePhone}`
          },
          address_ship: `${this.adres}`,
          date_ship: `${date}`,
          comments: `${this.comment}`,
          position: []
        };
        this.getTovars.forEach(element => {
          servBuy.position.push(element)
        });
        console.log(servBuy);
        return servBuy
      },
    },

    created() {
      try {
        this.$store.dispatch('getTovarsJson', this.$store.getters.user.id).finally(() => {
          this.$store.dispatch('getGetUserJson', this.$store.getters.user.id)
        });

      } catch (e) {
        console.log(e)
      }


    },

  }
</script>

<style scoped>

</style>
