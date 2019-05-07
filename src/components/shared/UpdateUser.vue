<template>
  <v-dialog width="500px" v-model="modal">
    <v-icon flat slot="activator" dark icon class="mr-3">edit</v-icon>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary HoverOrange">Редактирование полей</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="firstName"
                label="Имя"
                type="text"
                v-model="firstName"
              ></v-text-field>
              <v-text-field
                name="secondName"
                label="Фамилия"
                type="text"
                v-model="lastName"
              ></v-text-field>
              <v-text-field
                name="lastName"
                label="Отчество"
                type="text"
                v-model="secondName"
              ></v-text-field>
              <v-text-field v-model="maskPhone" v-if="false"></v-text-field>
              <v-text-field
                :mask="maskPhone"
                v-model="phone"
                name="phone"
                label="Телефон для связи"
                placeholder="Телефон для связи"
                required
              ></v-text-field>
              <v-text-field
                :mask="maskPhone"
                v-model="workPhone"
                name="workPhone"
                label="Рабочий телефон"
                placeholder="Рабочий телефон"
                required
              ></v-text-field>
              <v-text-field
                name="email"
                label="Персональный email"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field
                name="workEmail"
                label="Рабочий email"
                type="text"
                v-model="workEmail"
              ></v-text-field>
              <v-text-field
                name="addres"
                label="Адрес"
                type="text"
                v-model="addres"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                @click="onCancel"
                :disabled="localLoading"
              >
                Закрыть
              </v-btn>
              <v-btn
                class="success"
                flat
                @click="onSave()"
                :disabled="localLoading "
                :loading="localLoading"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>

  export default {
    props: ['id', 'firstName', 'secondName', 'lastName', 'phone', 'email', 'workEmail', 'workPhone', 'addres'],
    data() {
      return {
        modal: false,
        maskPhone: 'phone',
        localLoading: false

      }
    },
    methods: {
      onCancel() {
        this.modal = false
      },
      onSave() {
        const data = {
          email: this.email,
          work_email: this.workEmail,
          FirstName: this.firstName,
          SecondName: this.secondName,
          LastName: this.lastName,
          phone: this.phone,
          mobile: this.workPhone,
          address: this.addres,
        };
        this.localLoading = true;
        this.$store.dispatch('updateUser', {
          id: this.id,
          data: data,
          idUser: this.$store.getters.user.id
        }).finally(() => {
          this.localLoading = false;
          this.modal = false;
        })
      }
    }
  }
</script>

<style>

  .HoverOrange:hover {
    background: #FFCC80 !important;
    color: black !important;
  }

</style>
