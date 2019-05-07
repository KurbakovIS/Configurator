<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="lastName"
                label="Фамилия"
                type="text"
                :rules="TextRules"
                v-model="lastName">
              </v-text-field>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Имя"
                type="text"
                :rules="TextRules"
                v-model="name">
              </v-text-field>
              <v-text-field v-model="maskPhone" v-if="false"></v-text-field>
              <v-text-field
                prepend-icon="contact_phone"
                name="phone"
                label="Телефон"
                type="phone"
                :mask="maskPhone"
                :rules="TextRules"
                v-model="phone">
              </v-text-field>
              <v-text-field
                prepend-icon="email"
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
                label="Введите пароль"
                type="password"
                :counter="6"
                :rules="passwordRules"
                v-model="password">
              </v-text-field>
              <v-text-field
                id="confirm-password"
                prepend-icon="lock"
                name="confirm-password"
                label="Повторите пароль"
                type="password"
                :counter="6"
                :rules="ConfirmPasswordRules"
                v-model="ConfirmPassword">
              </v-text-field>
              <v-select
                prepend-icon="business"
                v-if="!checkbox"
                :items="getCompanyList"
                label="Выберите компанию из списка"
                v-model="company"
                menu-props="auto"
                hide-details
                single-line
                :rules="TextRules"
              ></v-select>
              <v-checkbox
                v-model="checkbox"
                label="Новая компания"
              ></v-checkbox>
              <v-text-field
                v-if="checkbox"
                prepend-icon="business"
                name="company"
                label="Компания"
                type="text"
                :rules="TextRules"
                v-model="newCompany">
              </v-text-field>
              <v-text-field
                v-if="checkbox"
                prepend-icon="call"
                name="companyPhone"
                label="Телефон компании"
                type="phone"
                :mask="maskPhone"
                :rules="TextRules"
                v-model="newCompanyPhone">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmit"
              color="primary"
              :loading="loading"
              :disabled="!valid || loading"
            >
              Создать аккаунт
            </v-btn>
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
        checkbox: '',
        newCompany: '',
        company: '',
        ConfirmPassword: '',
        email: '',
        password: '',
        name: '',
        lastName: '',
        newCompanyPhone: '',
        phone: '',
        valid: false,
        maskPhone: 'phone',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        TextRules: [
          v => !!v || 'Поле обязательно для заполнения',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be less than 6 characters'
        ],
        ConfirmPasswordRules: [
          v => !!v || 'Password is required',
          v => v === this.password || 'Повторите пароль'
        ]
      }
    },
    methods: {
      onSubmit() {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password,
            FirstName: this.name,
            LastName: this.lastName,
            phone: this.phone,
            newCompany: this.checkbox ? this.checkbox : false
          };

          if (this.checkbox) {
            user['newCompanyName'] = this.newCompany;
            user['newCompanyPhone'] = this.newCompanyPhone
          } else {
            user['idCompany'] = this.getCompanyId(this.company)
          }

          this.$store.dispatch('registerUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(err => console.log(err));
        }
      },
      getCompanyId(name) {
        let company = this.getCompany.filter(element => {
          return element.name == name;
        });
        // console.log(company[0]._id)
        return company[0]._id
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      getCompany() {
        return this.$store.getters.company
      },
      getCompanyList() {
        let companys = [];
        if (this.getCompany) {
          this.getCompany.forEach(element => {
            companys.push(element.name)
          });
          return companys
        }
      }
    },
    created() {
      this.$store.dispatch('getCompanysJson')
    }
  }
</script>

<style scoped>

</style>
