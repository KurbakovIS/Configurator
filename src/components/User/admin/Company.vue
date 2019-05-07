<template>

  <v-card flat style="min-width: 1200px">
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Добавить новую компанию</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="maskPhone" v-if="false"></v-text-field>
                  <v-text-field v-model="editedItem.phone"
                                label="Телефон"
                                :mask="maskPhone"
                                type="phone"
                                name="phone"
                  ></v-text-field>
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
      :items="getCompany"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.phone }}</td>
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
        maskPhone: 'phone',
        headers: [
          {
            text: 'ФИО',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {text: 'Телефон', value: 'phone', sortable: false},
          {text: 'Действие', value: 'action', sortable: false,align: 'center'}
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          phone: '',
        },
        defaultItem: {
          name: '',
          phone: '',
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
        return this.editedIndex === -1 ? 'Добавить компанию' : 'Редактировать компанию'
      },
      loading() {
        return this.$store.getters.loading
      },
      getCompany() {
        return this.$store.getters.company
      },
    },
    methods: {
      initialize() {
        this.getCompany
      },

      editItem(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.desserts.indexOf(item);
        confirm('Вы уверены, что хотите удалить эту компанию?') && this.desserts.splice(index, 1)
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
      this.initialize();
      this.$store.dispatch('getCompanysJson')
    },
  }
</script>

<style scoped>

</style>
