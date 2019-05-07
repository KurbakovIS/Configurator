<template>
  <v-card>
    <v-card-title primary-title>
      <v-container>
        <v-layout wrap>

          <h2 class="headline mb-0">Выбранные параметры сервера</h2>

          <v-card-text>
            <v-layout wrap>
              <v-flex xs6 align-self-center>
                <p class="title">Наименование компонента</p>
              </v-flex>
              <v-flex xs4>
                <p class="title">Выбранный элемент</p>
              </v-flex>
              <v-flex xs2>
                <p class="title">Количество</p>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Процессор</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{processor}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{countProc}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Операционная система</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{selectOs}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  -
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Объем оперативной памяти</v-subheader>
              </v-flex>
              <v-flex xs4>
                -
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{asdMemorys}} Гб.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Сетевая карта</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{network}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{selectNetwork}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text v-for="element in selectTransceiver" v-if="element['volume']">
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Трансивер сетевой карты</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{element['name']}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{element['volume']}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>HBA</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{selectHba}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{countSelectHba}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text v-for="element in selectHbaTransceiver" v-if="element['volume']">
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Трансивер HBA</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{element['name']}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{element['volume']}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>RAID</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{selectRaidController}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{countSelectRaidController}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Защита кэшированных данных</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{this.dataProtection ? `${this.dataProtection}` : "Нет"}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  -
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Системные накопители</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{selectSistemNakopitel}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{selectSistemNakopitelMemory}} ГБ / {{dopSystemMemoryCount}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Программа гарантийной поддержки</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{selectWarrantyProgram}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  -
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

<!--          <v-card-text>-->
<!--            <v-layout wrap align-center>-->
<!--              <v-flex xs6 align-self-center>-->
<!--                <v-subheader>Отсек 5,25</v-subheader>-->
<!--              </v-flex>-->
<!--              <v-flex xs4>-->
<!--                - -->
<!--              </v-flex>-->
<!--              <v-flex xs2>-->
<!--                <v-card-text>-->
<!--                  {{selectDopBay}} шт.-->
<!--                </v-card-text>-->
<!--              </v-flex>-->
<!--            </v-layout>-->
<!--          </v-card-text>-->
<!--          <v-divider inset></v-divider>-->

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>SlimDVD привод</v-subheader>
              </v-flex>
              <v-flex xs4>
                -
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  {{selectCountSlimDvd}} шт.
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

<!--          <v-card-text>-->
<!--            <v-layout wrap align-center>-->
<!--              <v-flex xs6 align-self-center>-->
<!--                <v-subheader>Планка 2 порта USB, 1 порт COM</v-subheader>-->
<!--              </v-flex>-->
<!--              <v-flex xs4>-->
<!--                - -->
<!--              </v-flex>-->
<!--              <v-flex xs2>-->
<!--                <v-card-text>-->
<!--                  {{selectCountUsbCom}} шт.-->
<!--                </v-card-text>-->
<!--              </v-flex>-->
<!--            </v-layout>-->
<!--          </v-card-text>-->
<!--          <v-divider inset></v-divider>-->

          <v-card-text>
            <v-layout wrap align-center>
              <v-flex xs6 align-self-center>
                <v-subheader>Сохранение неисправных носителей</v-subheader>
              </v-flex>
              <v-flex xs4>
                {{this.SavingBad ? `${this.SavingBad}` : "Нет"}}
              </v-flex>
              <v-flex xs2>
                <v-card-text>
                  -
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

        </v-layout>
      </v-container>
    </v-card-title>

    <v-card-title primary-title>
      <v-container>
        <v-layout wrap>

          <v-layout align-self-center row>
            <v-flex xs4>
              <v-subheader>Подсистема хранения</v-subheader>
            </v-flex>
            <v-flex xs2>
              <v-subheader>Форм-Фактор</v-subheader>
            </v-flex>
            <v-flex xs2>
              <v-subheader>Интерфейс</v-subheader>
            </v-flex>
            <v-flex xs2>
              <v-subheader>Объем</v-subheader>
            </v-flex>
            <v-flex xs1 class="text-xs-center">
              <v-subheader>Количество</v-subheader>
            </v-flex>
          </v-layout>

          <v-card-text v-for="element in valueObjFormFactor" class="ml-5">
            <v-layout wrap align-center >
              <v-flex xs4 align-self-center>
                <v-subheader>Системные накопители</v-subheader>
              </v-flex>
              <v-flex xs2>
                {{element['name'+element['id']]}}
              </v-flex>
              <v-flex xs2>
                {{element['sata/sas'+element['id']]}}
              </v-flex>
              <v-flex xs2>
                {{element['memory'+element['id']]}} ГБ.
              </v-flex>
              <v-flex xs1 class="text-xs-center">
                {{element['volume'+element['id']]}} шт.
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider inset></v-divider>

        </v-layout>
      </v-container>
    </v-card-title>
  </v-card>

</template>

<script>
  export default {
    props: [
      'processor',
      'countProc',
      'selectOs',
      'asdMemorys',
      'selectNetwork',
      'network',
      'selectHba',
      'countSelectHba',
      'countSelectRaidController',
      'selectRaidController',
      'selectWarrantyProgram',
      'selectSistemNakopitel',
      'selectSistemNakopitelMemory',
      'dopSystemMemoryCount',
      'selectTransceiver',
      'selectHbaTransceiver',
      'dataProtection',
      'SavingBad',
      'valueObjFormFactor',
      'selectDopBay',
      'selectCountSlimDvd',
      'selectCountUsbCom',
    ],
    name: "SelectParam"
  }
</script>

<style scoped>

</style>
