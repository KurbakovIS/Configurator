<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout>
      <v-flex xs12>
        <h1 class="display-1 mb-2">Стоечные серверные системы ТАЛМЕР</h1>
        <p class="title font-italic">Компактные высокопроизводительные сервера устанавливаемые в Rack стойку</p>
      </v-flex>
    </v-layout>



    <v-layout>
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple">
        </v-progress-circular>
      </v-flex>

      <v-flex v-for="category,i in categoryList" v-else :key="i" xs3 >
        <router-link :to="'/OneCategory/'+category.key" tag="span" class="pointer">

          <v-card min-height="34em">
            <v-card-title primary-title>
              <h3 class="headline text-xs-center">{{category.name}}</h3>
            </v-card-title>

            <v-img
              :src="category.image"
              height="200px"
              aspect-ratio="2.75"
              contain
            ></v-img>

            <v-card-title>
              <div>
                <p class="text-xs-left body-2">{{category.description}}:</p>
                <ul>
                  <li class="text-xs-left" v-for="element in category.param">{{element}}</li>
                </ul>
              </div>
            </v-card-title>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {

      }
    },
    computed:{
      loading() {
        return this.$store.getters.loading
      },
      categoryList(){
        return this.$store.getters.category
      }
    },
    created() {
      this.$store.dispatch('getCategoryJson')
    }
  }
</script>

<style scoped>

</style>
