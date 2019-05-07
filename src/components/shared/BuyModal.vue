<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="primary HoverOrange" flat slot="activator" >Добавить в заказ</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary HoverOrange">Добавить в заказ?</h1>
            </v-card-title>
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
    props:{
      ad:Object,
      getJsonBuy:Function,
    },
    data() {
      return {
        modal: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      onCancel() {
        this.modal = false
      },
      onSave() {
        console.log(this.$store.getters.user)
          this.localLoading = true;
          this.$store.dispatch('createOrder', {tovar:this.getJsonBuy(),id:this.$store.getters.user.id})
            .finally(() => {
              this.localLoading = false;
              this.modal = false;
            })
      }
    }
  }
</script>

<style >

  .HoverOrange:hover{
    background: #FFCC80 !important;
    color: black  !important;
  }

</style>
