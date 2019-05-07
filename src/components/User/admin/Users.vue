<template>

    <v-card flat style="min-width: 1200px">
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Добавить нового пользователя</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="ФИО"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.mobile" label="Телефон"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.phone" label="Рабочий телефон"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.email" label="Почта"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.work_email" label="Рабочая почта"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.work_email" label="Адрес"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Отмена</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.mobile }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.work_email }}</td>
          <td>{{ props.item.address }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
  export default {
    name: "Users",
    data() {
      return {
        headers: [
          {
            text: 'ФИО',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {text: 'Телефон', value: 'mobile'},
          {text: 'Рабочий телефон', value: 'phone'},
          {text: 'Почта', value: 'email', sortable: false},
          {text: 'Рабочая почта', value: 'work_email', sortable: false},
          {text: 'Адреса', value: 'address', sortable: false},
          {text: 'Действие', value: 'action', sortable: false}
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          mobile: 0,
          phone: 0,
          email: 0,
          work_email: 0,
          address: ''
        },
        defaultItem: {
          name: '',
          mobile: 0,
          phone: 0,
          email: 0,
          work_email: 0,
          address: ''
        }
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Добавить пользователя' : 'Редактировать пользователя'
      },
      loading() {
        return this.$store.getters.loading
      },
    },
    methods: {
      initialize() {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            mobile: 159,
            phone: 6.0,
            email: 24,
            work_email: 4.0,
            address: 'dsdsadsadsa'
          },

          {
            name: 'Donut',
            mobile: 452,
            phone: 25.0,
            email: 51,
            work_email: 4.9,
            address: 'dsdsadsadsa'
          },
          {
            name: 'KitKat',
            mobile: 518,
            phone: 26.0,
            email: 65,
            work_email: 7,
            address: 'dsdsadsadsa'
          }
        ]
      },

      editItem(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.desserts.indexOf(item);
        confirm('Вы уверены, что хотите удалить этого пользователя?') && this.desserts.splice(index, 1)
      },

      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    },
    created() {
      this.initialize()
    },
  }
</script>

<style scoped>

</style>
