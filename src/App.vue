<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list>

        <v-list-group
          prepend-icon="filter"
          value="true"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Фильтр</v-list-tile-title>
          </v-list-tile>

          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>

            <v-list-tile

              @click=""
            >
              <v-list-tile-title></v-list-tile-title>
              <v-list-tile-action>
                <v-icon></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>


        </v-list-group>

        <v-list-tile
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>


        <v-list-tile slot="activator">
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          @click="onLogout"
          v-if="isUserLoggedIn"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="'Выйти'"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark absolute clipped-left color="primary">

      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>

      <v-toolbar-title>
        <v-layout align-center justify-center>
          <!--          <a href="https://talmer.ru/">-->
          <!--            <img src="https://talmer.ru/local/templates/dweb/images/logo-white.png" alt=""></a>-->
          <router-link to="/" tag="span" class="pointer ml-5">
            Конфигуратор серверов ТАЛМЕР
          </router-link>
        </v-layout>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          flat
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
          <v-btn color="red" fab small dark v-if="link.count">
            {{link.count}}
          </v-btn>
        </v-btn>

        <v-btn
          @click="onLogout"
          flat
          v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          Выйти
        </v-btn>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-layout row align-center justify-center>
          <v-btn class="primary" small fab flat>
            <v-icon> phone_in_talk</v-icon>
          </v-btn>
          <v-layout column>
            <p class="ma-0 subheading"> +7 (499) 750 06 60</p>
            <p class="ma-0"> Получить консультацию</p>
          </v-layout>
        </v-layout>


      </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">

      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        @input="closeError"
        @value="true"
        color="error"
      >
        {{error}}
        <v-btn
          dark
          flat
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>


    <v-footer
      dark
      height="auto"
      style="margin-top: 15em"

    >
      <v-card
        flat
        tile
        width="100%"
        class="primary  white--text "
        style="padding-left: 10em; padding-right: 10em"
      >
        <v-layout align-center justify-space-between row fill-heigh>

          <v-layout justify-start align-center row fill-heigh>
            <v-flex xs2>
              <v-img
                src="https://talmer.ru/local/templates/dweb/images/logo-white.png"
                aspect-ratio="2.75"
                height="50px"
                contain
                class="ma-3"
              ></v-img>
            </v-flex>

            <v-flex xs3>
              <v-card-text class="font-weight-light subheading">
                Системная интеграция
                для развития бизнеса
              </v-card-text>
            </v-flex>

            <v-flex xs4>

              <v-card-text class="font-weight-light subheading text-xs-center">
                <v-icon left>place</v-icon>
                Россия, Москва,
                Рублёвское шоссе, д 28
              </v-card-text>
            </v-flex>

            <v-flex xs2>

              <v-card-text class="font-weight-light subheading text-xs-center">
                <v-icon left>email</v-icon>
                info@talmer.ru
              </v-card-text>
            </v-flex>

          </v-layout>

        </v-layout>
        <v-divider></v-divider>
        <v-card-text class="font-weight-light ">
          <v-layout row>
            <ul class="app_li">
              <template v-for="element in li1">
                <a class="app" :href="i" v-for="(i,key) in element">
                  <li>{{key}}</li>
                </a>
              </template>
            </ul>

            <ul style="column-count: 2; margin-left: 150px" class="app_li ">
              <template v-for="element in li2">
                <a class="app" :href="i" v-for="(i,key) in element">
                  <li>{{key}}</li>
                </a>
              </template>
            </ul>
          </v-layout>

        </v-card-text>
        <v-divider></v-divider>
        <v-layout justify-start row>
          <v-flex xs2>
            <v-card-text class="font-weight-light">
              &copy;2019, ООО “ТАЛМЕР”
            </v-card-text>
          </v-flex>
          <v-flex xs2>
            <v-card-text class="font-weight-light">
              Все права защищены.
            </v-card-text>
          </v-flex>
        </v-layout>

      </v-card>
    </v-footer>
  </v-app>

</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        drawer: false,
        li1: [
          {'О КОМПАНИИ': 'https://talmer.ru/about/'},
          {'Заказчики': 'https://talmer.ru/about/customers/'},
          {'Партнёры': 'https://talmer.ru/about/partners/'},
        ],
        li2: [
          {'НАПРАВЛЕНИЯ': 'https://talmer.ru/activities/'},
          {'Центры обработки данных': 'https://talmer.ru/activities/stroitelstvo_tsod/'},
          {'Высоконагруженные комплексы': 'https://talmer.ru/activities/vysokonagruzhennye_kompleksy/'},
          {'Сетевая инфраструктура': 'https://talmer.ru/activities/setevye_resheniya/'},
          {'Интеграционные решения': 'https://talmer.ru/activities/integratsionnye_resheniya/'},
          {'Портальные решения': 'https://talmer.ru/activities/portalnye_resheniya/'},
          {'Информационная безопасность': 'https://talmer.ru/activities/informatsionnaya_bezopasnost/'},
          {'Интернет вещей': 'https://talmer.ru/activities/internet_veshchey/'},
          {'Сопровождение и техническая поддержка': 'https://talmer.ru/activities/soprovozhdenie_i_tekhnicheskaya_podderzhka/'},
        ],
      }
    },
    methods: {
      closeError() {
        this.$store.dispatch('clearError')
      },
      onLogout() {
        this.$store.dispatch('logoutUser');
        this.$storage.remove('test')
        console.log(this.$storage)
        this.$router.push('/')

      }
    },
    computed: {
      getTovars() {
        let count = 0;
        if (this.$store.getters.tovar) {
          try {

            console.log(this.$store.getters.tovar)
            this.$store.getters.tovar.forEach(element => {
              count += +element.count_position
            });
            console.log(count);
            return count
          } catch (e) {
            console.log(e)
          }
        }
      },
      error() {
        return this.$store.getters.error
      },
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      },
      links() {
        if (this.isUserLoggedIn) {
          this.$storage.set('test', {key: this.$store.getters.user.id}, {ttl: 60 * 1000})
          if (this.$store.getters.getUser.hasOwnProperty('manager_id')) {
            return [
              {title: 'Панель администрирования', icon: 'perm_identity', url: '/admin', count: ''},
            ]
          } else {
            return [
              {title: 'Личный кабинет', icon: 'perm_identity', url: '/orders', count: ''},
              {title: 'Корзина', icon: 'shopping_cart', url: '/list', count: `${this.getTovars}`},
            ]
          }

        } else {
          return [
            {title: 'Логин', icon: 'lock', url: '/login', count: ''},
            {title: 'Регистрация', icon: 'face', url: '/registration', count: ''},
          ]
        }
      }
    },
    created() {
      // try {
      //   this.$store.dispatch('getTovarsJson', this.$store.getters.user.id);
      // } catch (e) {
      //   console.log(e)
      // }
    },
    props: {
      source: String
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans');

  .pointer {
    cursor: pointer;
  }


  .app_li > a:first-child {
    font-weight: 700;
    text-transform: uppercase;
  }

  .app_li li {
    margin-bottom: 20px;
    list-style: none;
  }

  .app {
    display: block;
    color: white;
    text-decoration: none;
  }
  .app:hover{
    text-decoration: underline;
  }

  /*a:after {*/
  /*  display: block; !*превращаем его в блочный элемент*!*/
  /*  content: ""; !*контента в данном блоке не будет поэтому в кавычках ничего не ставим*!*/
  /*  height: 3px; !*задаём высоту линии*!*/
  /*  width: 0%; !*задаём начальную ширину элемента (линии)*!*/
  /*  background-color: white; !*цвет фона элемента*!*/
  /*  transition: width 0.4s ease-in-out; !*данное свойство отвечает за плавное изменение ширины. Здесь можно задать время анимации в секундах (в данном случае задано 0.4 секунды)*!*/
  /*}*/
  /*a:hover:after,*/
  /*a:focus:after {*/
  /*  width: 100%;*/
  /*}*/
  .application {
    font-family: 'Fira Sans' !important;
  }

  .navigation-drawer__border {
    display: none;
  }


</style>
