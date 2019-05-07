<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn fab
           small
           color="white"
           @click="copy(order._id)"
           slot="activator"
    >
      <v-icon>file_copy</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary HoverOrange">Копировать заказ?</h1>
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
                Копировать
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'

  export default {
    props:['id'],
    data() {
      return {
        modal: false,
        localLoading: false
      }
    },
    methods: {
      onCancel() {
        this.modal = false
      },
      onSave() {
        this.localLoading = true;
        axios({
          url: `http://configurator.talmer.ru/api/dublicateOrder/${this.id}`,
          method: 'POST',
          responseType: 'blob',
        }).then((response) => {
          this.$store.dispatch('getTovarsJson', this.$store.getters.user.id);
          this.localLoading = false;
          this.modal = false;
          // console.log(response.data);
        });
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
