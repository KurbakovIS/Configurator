<template>

  <div>
    <v-container grid-list-lg>
      <v-layout row>
        <v-flex xs12 sm5 md3 otstup>
          <details>
            <summary @click="hotSwaps" >Hot-swap</summary>
            <v-container fluid >
              <v-checkbox v-for="group in adsHotSwaps" :label="group" :value='group'
                          v-model="hotSwap" ></v-checkbox>
              {{hotSwap}}}
            </v-container>
          </details>

        </v-flex>
        <v-layout row wrap  v-if="adsHotSwaps.length != 0">

          <v-flex
            v-for="ad of ads"
            :key="ad.id"
            xs12
            sm6
            md4
          >

            <v-card>
              <v-img
                :src="ad.imageSrc"
                aspect-ratio="2.75"
                height="200px"
              ></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ad.name}}</h3>
                  <div v-for="component in ad.components"> {{component.category}}: {{component.name}}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat :to="'/ad/' + ad.id">Open</v-btn>
                <v-btn raised class="primary">Buy</v-btn>
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap  v-else>

        <v-flex
            v-for="ad of adn"
            :key="ad.id"
            xs12
            sm6
            md4
          >
            <v-card>
              <v-img
                :src="ad.imageSrc"
                aspect-ratio="2.75"
                height="200px"
              ></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ad.name}}</h3>
                  <div v-for="component in ad.components"> {{component.category}}: {{component.name}}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat :to="'/ad/' + ad.id">Open</v-btn>
                <v-btn raised class="primary">Buy</v-btn>
              </v-card-actions>

            </v-card>
          </v-flex>

        </v-layout>

      </v-layout>

    </v-container>
  </div>

</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        hotSwap: [],
        adsHotSwaps: [],
        aa:false
      }
    },
    computed: {
      promoAds() {
        return this.$store.getters.promoAds
      },
      adn() {
        return this.$store.getters.ads
      },
      ads() {
        return this.adn
          .filter(ad => {
            return ad.components.some(component => component.attributes.some(attribute =>
              this.hotSwap.includes(attribute.name) && attribute.category == 'Hot-swap'));
          });
        // .filter(ad => {
        //   return ad.components.some(component => component.attributes.some(attribute=>
        //     attribute.value == 1536 && attribute.name == 'Максимальный объем памяти'))
        // })
      },

    },
    methods: {
      hotSwaps() {
        for (let ad in this.adn) {
          let components = this.adn[ad].components;

          for (let component in components) {
            let attributes = components[component].attributes;

            for (let attribute in attributes) {
              let attribute = attributes[attribute];

              if (attribute.category == 'Hot-swap') {
                this.adsHotSwaps.push(attribute.name)
              }
            }
          }
        }
        this.adsHotSwaps = [...new Set(this.adsHotSwaps)]
      }
    }
  }
</script>

<style>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  .otstup {
    margin-right: 200px !important;
  }

</style>
