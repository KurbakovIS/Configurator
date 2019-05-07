<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center pt-5">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout justify-center v-else-if="!loading">
      <v-tabs
        centered
        color="primary"
        dark
        icons-and-text
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab href="#tab-1">
          Пользователи
          <v-icon>account_box</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Заказы
          <v-icon>shopping_cart</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Компании
          <v-icon>business</v-icon>
        </v-tab>

        <v-tab-item
          key="1"
          value="tab-1"
        >
        <app-admin-user></app-admin-user>
        </v-tab-item>

        <v-tab-item
          key="2"
          value="tab-2"
        >
          <app-admin-orders></app-admin-orders>
        </v-tab-item>

        <v-tab-item
          key="3"
          value="tab-3"
        >
          <app-admin-companys></app-admin-companys>
        </v-tab-item>

      </v-tabs>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Admin",
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
