<template>

  <v-card flat style="min-width: 1200px">
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Добавить новый заказ</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.order_id" label="№ Заказа"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.position_id" label="№ Позиции в заказе"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.server_name" label="Название сервера"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 >
                  <v-text-field v-model="editedItem.position_count" label="Количество"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.order_status" label="Статус Заказа"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.customer" label="Клиент"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.order_date" label="Дата заказа"></v-text-field>
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
      :items="getOrders"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.order_id }}</td>
        <td>{{ props.item.position_id }}</td>
        <td>{{ props.item.server_name }}</td>
        <td>{{ props.item.position_count }}</td>
        <td>{{ props.item.order_status }}</td>
        <td>{{ props.item.customer }}</td>
        <td>{{ props.item.order_date }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-3"
            @click="getPDF(props.item)"
          >
            picture_as_pdf
          </v-icon>
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
    name: "Orders",
    data() {
      return {
        headers: [
          {
            text: '№ Заказа',
            align: 'left',
            sortable: false,
            value: 'order_id'
          },
          {text: '№ Позиции в заказе', value: 'position_id', sortable: false},
          {text: 'Название сервера', value: 'server_name', sortable: false},
          {text: 'Количество', value: 'position_count'},
          {text: 'Статус Заказа', value: 'order_status', sortable: false},
          {text: 'Клиент', value: 'customer', sortable: false},
          {text: 'Дата заказа', value: 'order_date', sortable: false},
          {text: 'Действие', value: 'action', sortable: false}
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          order_id: '',
          position_id: '',
          server_name: '',
          position_count: '',
          order_status: '',
          customer: '',
          order_date: ''
        },
        defaultItem: {
          order_id: '',
          position_id: '',
          server_name: '',
          position_count: '',
          order_status: '',
          customer: '',
          order_date: ''
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
      getOrders() {
        return this.$store.getters.ordersAdmin
      },
    },
    methods: {
      getPDF($id) {
        axios({
          url: `http://configurator.talmer.ru/api/specification/${$id}`,
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
      initialize() {
        this.getOrders
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
      this.initialize();
      this.$store.dispatch('getAllOrdersAdminJson')
    },
  }
</script>

<style scoped>

</style>
