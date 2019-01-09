<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          subheader
          two-line
        >
          <v-list-tile @click=""
                       v-for="order in orders"
                       :key="order.id">

            <v-list-tile-action>
              <v-checkbox :input-value="order.done" @change="markDown(order)" color="success">

              </v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn class="primary" :to="'/ad/'+order.adId">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Orders",

    data() {
      return {
        orders: [
          {
            id: 'fds3',
            name: 'Vlad',
            phone: '8-985-898-63-35',
            adId: '123',
            done: false
          }
        ]
      }
    },
    methods: {
      markDown(order) {
        order.done = true
      }
    },
  }
</script>

<style scoped>

</style>
