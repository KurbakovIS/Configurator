<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Авторизация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <p>логин - client@serverfon.ru , пароль- 123456</p>
            <!--            <p>логин - manager@talmer.ru , пароль- 123456</p>-->
            <v-form ref="form" v-model="valid" lazy-validation >
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
                v-model="email">
              </v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                v-on:keypress.13="onSubmit"
                :rules="passwordRules"
                v-model="password">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmit"
              color="primary"
              :loading='loading'
              :disabled="!valid || loading"
            >
              Вход
            </v-btn>
            <p v-if="getError">{{getError}}</p>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'Поле E-mail обязательно к заполнению',
          v => /.+@.+/.test(v) || 'E-mail некорректно введен'
        ],
        passwordRules: [
          v => !!v || 'Поле Password  обязательно к заполнению',
          v => (v && v.length >= 6) || 'Длина Password минимум 6 символов'
        ]
      }
    },
    methods: {
      enterClicked() {
        alert("Enter clicked")
      },
      onSubmit() {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          };

          this.$store.dispatch('loginUser', user)
            .finally(() => {
              this.$router.go(-1)
              // this.$store.dispatch('getTovarsJson', this.$store.getters.user.id);
            })
            .catch(err => {
              console.log(err)
            });
        }

      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      getError() {
        if (this.$store.getters.loginError) {
          return this.$store.getters.loginError
        } else {
          return ''
        }

      }
    },
    created() {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Ввойдите в систему')
      }
    }
  }
</script>

<style scoped>

</style>
