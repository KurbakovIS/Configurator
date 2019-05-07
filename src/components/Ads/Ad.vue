<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center pt-5">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple">
        </v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout v-else-if="!loading" column>
      <v-card>
        <v-layout pt-5>
          <v-layout column>
            <v-card-title>
              <h3 class="headline">СЕРВЕР ТАЛМЕР {{ad.name}}
              </h3>
            </v-card-title>
            <v-card-text class="subheading"
            >
              <p style="width: 80%;text-align: justify" class="mb-0">
                Сервера Supermicro обеспечивают максимальную емкость и производительность в минимальном
                пространстве.</p>
              <p class="mb-0"> Сервер разработан на базе {{ad.description['chipset']}} с поддержкой
                {{ad.description['count_pr']}} семейства {{ad.description['model_pr']}},
                памяти {{ad.description['type_memory']}} {{getMemory['haracteristikMemory']}}
                {{getMemory['typeModul']}}
                с
                рабочей частотой до {{ad.description['w_ch']}} МГц.
              </p>
              <p class="mb-0">Исполнение корпуса позволяет устанавливать до {{Object.values(ad.description['dcc'])[0]}}
                накопителей с
                {{ad.description['dc']}} интерфейсом
                <span v-if="getOpisanie.length >1 ">
                  {{getOpisanie[0]}} и {{getOpisanie[1]}}
                 </span>
                <span v-else-if="getOpisanie[0].indexOf('3,5') != -1">
                стандартного {{getOpisanie[0]}} и малого форм-фактора (2,5”)
                </span>
                <span v-else>
                  {{getOpisanie[0]}}
                 </span>
                c возможностью «горячей» замены и построения отказоустойчивых RAID-массивов.
                Сервер имеет высоту {{ad.description['rack']}} и комплектуется набором для монтажа в стойку.
              </p>
              <p class="ma-0" v-if="ad.corp_type == 'WIO'">В сервер можно установить до
                <template v-for="element in ad.description['sl_r']">
                  <span v-for="(key,name) in element">
                {{key}} устройств  подключаемых через интерфейс {{name}};
              </span>
                </template>
              </p>
              <p class="ma-0" v-else>Сервер имеет
                <template v-for="element in ad.description['sl_r']">
                  <span v-for="(key,name) in element">
                {{key}} слот(а) {{name}};
              </span>
                </template>
              </p>
              <!--              {{this.limitSlot['corpus']}}\\{{this.limitSlot['materinka']}}-->
              <!--              {{this.ad.count_cc}}\\{{this.ad.count_mp}}-->

            </v-card-text>
          </v-layout>

          <v-img
            :src="ad.image"
            width="400px"
            class="titulImage"
          >
          </v-img>

        </v-layout>

        <v-tabs
          centered
          color="primary"
          dark
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab href="#tab-1">
            Конфигуратор
          </v-tab>

          <v-tab href="#tab-2">
            Выбранные параметры
          </v-tab>

          <v-tab-item
            :value="'tab-' + 1"
          >
            <v-card flat>
              <v-layout row mt-4>

                <v-layout column mr-2>

                  <v-card>

                    <v-card-title>
                      <div>
                        <span class="title">Выбор базовых компонентов</span><br>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-container>
                        <v-layout wrap>

                          <v-flex xs6 align-self-center>
                            <v-subheader>Процессор*</v-subheader>
                          </v-flex>
                          <v-flex xs4>
                            <v-select
                              :items="getServer"
                              v-model="processor"
                              label="Процессор"
                              :rules="[rules.required]"
                              class="input-group--focused"
                              item-value="text"

                            ></v-select>
                          </v-flex>
                          <v-flex xs2>
                            <v-card-text>
                              <v-text-field style="min-width: 47px"
                                            suffix="шт."
                                            height="17px"
                                            min="1"
                                            v-model="selectProc"
                                            :max="countProc"
                                            type="number"
                                            :disabled="!processor"
                                            :error="selectProc > countProc"
                                            :hint="'Максимум ' + countProc"
                                            onkeydown="return false"
                              ></v-text-field>
                            </v-card-text>
                          </v-flex>
                          <v-flex xs6 align-self-center>
                            <v-subheader>Операционная система</v-subheader>
                          </v-flex>
                          <v-flex xs4>
                            <v-select
                              :items="getOs"
                              v-model="selectOs"
                              class="input-group--focused"
                              label="Выберите ОС"
                            ></v-select>
                          </v-flex>


                          <v-flex xs6 align-self-center>
                            <v-subheader>Объем оперативной памяти</v-subheader>
                          </v-flex>

                          <v-flex xs4 style="position: relative">
                            <p class="mt-5" style="position: absolute;opacity: 0.62"> (1 Гб)</p>
                            <v-slider
                              :thumb-size="24"
                              v-model="asdMemorys"
                              thumb-label="always"
                              :max="ad.ram"
                              min="1"
                              step="1"
                            ></v-slider>
                            <p class="mt-5" style="position: absolute; top: 1px; right: 1px;opacity: 0.62">
                              ({{ad.ram}} Гб)</p>
                          </v-flex>


                          <v-flex xs2>
                            <v-card-text style="padding: 0; padding-bottom: 10px; padding-left: 10px;">
                              <v-text-field type="number"
                                            class="text-xs-center"
                                            min="1"
                                            suffix="Гб."
                                            :max="ad.ram"
                                            v-model="asdMemorys"
                                            height="12px"
                                            style="text-align:center"
                              ></v-text-field>
                            </v-card-text>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-actions>
                  </v-card>

                  <v-card>
                    <v-card-title>
                      <div>
                        <span class="title">Подсистема хранения</span><br>
                      </div>

                    </v-card-title>

                    <v-flex ml-2>
                      <v-btn color="primary HoverOrange" class="body-1" small
                             @click="PlusObjFactor()"
                             :disabled="getSelectAllFormFactor>=maxDisk || valueObjFormFactor.length==maxDisk"
                      >
                        Добавить
                      </v-btn>
                    </v-flex>

                    <template v-for=" i in valueObjFormFactor">
                      <v-card-actions>

                        <v-container grid-list-md>

                          <v-layout align-end justify-center fill-height wrap>

                            <v-flex xs3>
                              <v-subheader>Подсистема хранения</v-subheader>
                            </v-flex>

                            <v-flex xs2 align-self-end>
                              <v-select
                                :items="formFactors"
                                v-model="i['name'+i['id']]"
                                class="input-group--focused"
                                item-value="text"
                                label="Форм-фактор"
                                @change="getValueDisk"
                              ></v-select>
                            </v-flex>

                            <v-flex xs2>
                              <v-select
                                :items="satSas"
                                v-model="i['sata/sas'+i['id']]"
                                class="input-group--focused"
                                item-value="text"
                                :disabled="!i['name'+i['id']]"
                                label="Интерфейс"

                              ></v-select>
                            </v-flex>

                            <v-flex xs2>
                              <v-select
                                :items="i['name'+i['id']][0] == '2'?filterDisk_2_5 : filterDisk_3_5"
                                v-model="i['memory'+i['id']]"
                                class="input-group--focused"
                                :disabled="!i['sata/sas'+i['id']]"
                                placeholder="0"
                                hint="Объем"
                                suffix="ГБ"
                                @change="i['memory'+i['id']] && getSelectAllFormFactor < maxDisk  ? i['volume'+i['id']] = 1 : i['volume'+i['id']] = 0"
                              ></v-select>
                            </v-flex>

                            <v-flex xs2>
                              <v-text-field type="number"
                                            text-xs-center
                                            min="0"
                                            :disabled="!i['memory'+i['id']]"
                                            :max="getSelectAllFormFactor > maxDisk? 0 :
                                            getSelectAllFormFactor == maxDisk? i['volume'+i['id']] : maxDisk"
                                            v-model="i['volume'+i['id']]"
                                            suffix="шт."
                                            height="32px"
                                            onkeydown="return false"
                              ></v-text-field>
                            </v-flex>

                            <v-flex xs1>
                              <v-btn color="error"
                                     class="body-1"
                                     left
                                     small
                                     fab
                                     style="width: 25px;height: 25px"
                                     @click="countMinusFormFactor(i['id'])"
                              >
                                <v-icon dark>highlight_off</v-icon>
                              </v-btn>
                            </v-flex>
<!--                            <v-flex v-if='i["name"+i["id"]] == "2,5\"" && formFactors.indexOf(3,5)'>-->
<!--                              <p>Будут добавлены дисковые корзины под 2,5” накопители</p>-->
<!--                            </v-flex>-->

                          </v-layout>
                        </v-container>
                      </v-card-actions>

                    </template>
                  </v-card>
                </v-layout>

                <v-layout column v-model="valid" lazy-validation>
                  <v-card>
                    <v-card-title>
                      <div>
                        <span class="title">Выбор дополнительных опций</span><br>
                      </div>
                    </v-card-title>
                    <v-flex v-if="MyRules">
                      <v-card-text>
                        <p class="caption red--text">{{MyRules['corpus']}}</p>
                        <p class="caption red--text">{{MyRules['materinka']}}</p>
                      </v-card-text>
                    </v-flex>
                    <v-card-actions>
                      <v-container>
                        <v-layout wrap>

                          <v-flex xs4 md3 mt-3>
                            <v-subheader>Системные накопители</v-subheader>
                          </v-flex>

                          <v-flex xs1 md2>
                            <v-container fluid>
                              <v-switch :label="''"
                                        v-model="switch4"
                                        height="3px"
                                        :disabled="spisokSistemNakopitel.length == 0"
                                        @change="clearSystemHoarder "
                              ></v-switch>
                            </v-container>
                          </v-flex>

                          <v-flex xs3 md3>
                            <v-select
                              :items="spisokSistemNakopitel"
                              class="input-group--focused"
                              item-value="text"
                              :disabled="!switch4"
                              label="Интерфейс"
                              v-model="selectSistemNakopitel"
                              @change="clearVolumeHoarder && getValueDisk"
                            ></v-select>
                          </v-flex>

                          <v-flex xs2 md2 v-if="selectSistemNakopitel == 'SuperDOM'">

                            <v-select
                              :items="getSuperDomValue"
                              class="input-group--focused"
                              item-value="text"
                              :disabled="selectSistemNakopitel=='' || selectSistemNakopitel=='не выбран'"
                              :rules="[rules.required]"

                              suffix="Гб"
                              v-model="selectSistemNakopitelMemory"
                              lazy-validation
                            ></v-select>
                            <!--                            label="Объем"-->
                          </v-flex>
                          <v-flex xs2 md2 v-else>

                            <v-select
                              :items="filterDisk_2_5"
                              class="input-group--focused"
                              item-value="text"
                              :disabled="selectSistemNakopitel=='' || selectSistemNakopitel=='не выбран'"
                              suffix="Гб"
                              v-model="selectSistemNakopitelMemory"
                            ></v-select>
                          </v-flex>

                          <v-flex xs2 md2 v-if="selectSistemNakopitel == 'SuperDOM'">
                            <v-card-text>
                              <v-text-field type="number"
                                            :disabled="selectSistemNakopitel=='не выбран' || selectSistemNakopitel==''"
                                            class="text-xs-center"
                                            min="0"
                                            :max="MaxDisks('SuperDOM')"
                                            v-model="dopSystemMemoryCount"
                                            suffix="шт."
                                            height="17px"
                                            :error="dopSystemMemoryCount > MaxDisks('SuperDOM')"
                                            :hint="'Максимум ' + MaxDisks('SuperDOM')"
                                            onkeydown="return false"
                              ></v-text-field>
                            </v-card-text>
                          </v-flex>
                          <v-flex xs2 md2 v-else>
                            <v-card-text>
                              <v-text-field type="number"
                                            :disabled="selectSistemNakopitel=='' || selectSistemNakopitel=='не выбран'"
                                            class="text-xs-center"
                                            min="0"
                                            v-model="dopSystemMemoryCount"
                                            :max="(MaxDisks('back_dd'))*2"
                                            suffix="шт."
                                            height="17px"
                                            step="1"
                                            :error="dopSystemMemoryCount > (MaxDisks('back_dd'))*2"
                                            :hint="'Максимум ' + (MaxDisks('back_dd'))*2"
                                            onkeydown="return false"
                              ></v-text-field>
                            </v-card-text>
                          </v-flex>

                          <v-flex xs5 align-self-center>
                            <v-subheader>Сетевая карта</v-subheader>
                          </v-flex>
                          <v-flex xs5>
                            <v-select
                              :items="getNameNetwork()"
                              v-model="network"
                              class="input-group--focused"
                              label="Сетевая карта"
                              @change="getChangeNetwork()"
                            ></v-select>
                          </v-flex>
                          <v-flex xs2>
                            <v-card-text>
                              <v-text-field :disabled="!network || network == 'не выбран'"
                                            suffix="шт."
                                            type="number"
                                            min="0"
                                            :max="getMaxCount(selectNetwork)"
                                            v-model="selectNetwork"
                                            height="17px"
                                            :error="selectNetwork > getMaxCount(selectNetwork)"
                                            :hint="'Максимум ' + getMaxCount(selectNetwork)"
                                            onkeydown="return false"
                              ></v-text-field>
                            </v-card-text>
                          </v-flex>
                          <template v-if=" network.match('SFP+')">
                            <template v-for=" i in selectTransceiver">

                              <v-flex lg5 md5>
                                <v-subheader>Трансивер</v-subheader>
                              </v-flex>

                              <v-flex lg1 md1>
                                <v-btn color="primary HoverOrange" class="body-1" small fab
                                       @click="PlusTransiver()"
                                       style="width: 25px;height: 25px"
                                       :disabled="selectTransceiver.length>=(+getVolumeNetwork[network] * selectNetwork)"
                                >
                                  <v-icon dark>add</v-icon>

                                </v-btn>
                              </v-flex>
                              <v-flex lg3 md3 align-self-end>
                                <v-select
                                  :items="getTransiver"
                                  v-model="i['name'+i['id']]"
                                  class="input-group--focused mr-1"
                                  item-value="text"
                                  placegolder="без трансиверов"
                                  label="Трансивер"
                                  @change="maxTransiver >= (getVolumeNetwork[network] * selectNetwork) ? i['volume'+i['id']] =0
                                     : i['name'+i['id']]!= 'Без трансиверов'? i['volume'+i['id']] = 1 :i['volume'+i['id']] = 0"
                                ></v-select>
                              </v-flex>

                              <v-flex lg1 md2>
                                <v-text-field type="number"
                                              :disabled="!i['name'+i['id']] || i['name'+i['id']] == 'Без трансиверов'"
                                              min="0"
                                              :max="maxTransiver >= (getVolumeNetwork[network] * selectNetwork) ? i['volume'+i['id']] : (getVolumeNetwork[network] * selectNetwork)"
                                              v-model="i['volume'+i['id']]"
                                              suffix="шт."
                                              onkeydown="return false"
                                ></v-text-field>
                              </v-flex>
                              <v-layout align-center justify-center>
                                <v-flex lg2>
                                  <v-btn color="error"
                                         class="body-1"
                                         left small fab
                                         style="width: 25px;height: 25px"
                                         @click="countMinusTransiver(i['id'])"
                                  >
                                    <v-icon dark>highlight_off</v-icon>
                                  </v-btn>
                                </v-flex>
                              </v-layout>

                            </template>
                          </template>


                          <v-flex xs5 align-self-center>
                            <v-subheader>HBA</v-subheader>
                          </v-flex>
                          <v-flex xs5>
                            <v-select
                              :items="getHba"
                              v-model="selectHba"
                              class="input-group--focused"
                              item-value="text"
                              label="HBA"
                              @change="clearCountHba()"
                            ></v-select>
                          </v-flex>
                          <v-flex xs2>
                            <v-card-text>
                              <v-text-field type="number"
                                            suffix="шт."
                                            min="0"
                                            v-model="countSelectHba"
                                            height="17px"
                                            placeholder="0"
                                            :max="getMaxCount(countSelectHba)"
                                            :disabled="!selectHba || selectHba == 'Не выбран'"
                                            :error="countSelectHba > getMaxCount(countSelectHba)"
                                            :hint="'Максимум ' + getMaxCount(countSelectHba)"
                                            onkeydown="return false"
                              ></v-text-field>
                            </v-card-text>
                          </v-flex>

                          <template v-if=" selectHba.match('SFP+')">
                            <template v-for=" i in selectHbaTransceiver">

                              <v-flex lg5 md5>
                                <v-subheader>HBA Трансивер</v-subheader>
                              </v-flex>

                              <v-flex lg1 md1>
                                <v-btn color="primary HoverOrange" class="body-1"
                                       small fab
                                       style="width: 25px;height: 25px"
                                       @click="PlusTransiverHBA()"
                                       :disabled="selectHbaTransceiver.length>=(+getHbaValue[0][selectHba]*countSelectHba)"
                                >
                                  <v-icon dark>add</v-icon>

                                </v-btn>
                              </v-flex>
                              <v-flex lg3 md3 align-self-end>
                                <v-select
                                  :items="getTransiver"
                                  v-model="i['name'+i['id']]"
                                  class="input-group--focused mr-3"
                                  item-value="text"
                                  placegolder="без трансиверов"
                                  label="Трансивер"
                                  @change="maxHbaTransiver >= (+getHbaValue[0][selectHba]*countSelectHba) ? i['volume'+i['id']] =0
                                     : i['name'+i['id']]!= 'Без трансиверов'? i['volume'+i['id']] = 1 :i['volume'+i['id']] = 0"
                                ></v-select>
                              </v-flex>

                              <v-flex lg1 md2>
                                <v-text-field type="number"
                                              :disabled="!i['name'+i['id']] || i['name'+i['id']] == 'Без трансиверов'"
                                              min="0"
                                              :max="maxHbaTransiver >= (+getHbaValue[0][selectHba]*countSelectHba) ? i['volume'+i['id']]
                                                : (+getHbaValue[0][selectHba]*countSelectHba)"
                                              v-model="i['volume'+i['id']]"
                                              suffix="шт."
                                              onkeydown="return false"
                                ></v-text-field>
                              </v-flex>

                              <v-layout align-center justify-center>
                                <v-flex lg2>
                                  <v-btn color="error"
                                         style="width: 25px;height: 25px"
                                         left small fab
                                         @click="countMinusTransiverHBA(i['id'])"
                                  >
                                    <v-icon dark>highlight_off</v-icon>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </template>
                          </template>


                          <v-flex xs5 align-self-center>
                            <v-subheader>RAID Контроллер</v-subheader>
                          </v-flex>
                          <v-flex xs5>
                            <v-select
                              :items="getRaid"
                              v-model="selectRaidController"
                              class="input-group--focused"
                              label="RAID"
                              @change="selectRaidController != 'не выбран' ? countSelectRaidController = 1 : countSelectRaidController = 0"
                            ></v-select>
                          </v-flex>
                          <v-flex xs2>
                            <v-card-text>
                              <v-text-field type="number"
                                            suffix="шт."
                                            min="0"
                                            placeholder="0"
                                            v-model="countSelectRaidController"
                                            height="17px"
                                            :max="getMaxCount(countSelectRaidController)"
                                            :disabled="!selectRaidController || selectRaidController == 'не выбран'"
                                            onkeydown="return false"
                              ></v-text-field>
                            </v-card-text>
                          </v-flex>
                          <template v-if="getCasRaid && selectRaidController && selectRaidController  != 'не выбран'">
                            <v-flex xs8 align-self-center>
                              <v-subheader>Защита кэшированных данных</v-subheader>
                            </v-flex>
                            <v-flex xs3 align-self-center mt-2>
                              <v-switch
                                :label="''"
                                v-model="dataProtection"
                                value="Да"
                                height="1px"
                              ></v-switch>
                            </v-flex>
                          </template>

                          <!--                          <template v-if="ad.ots_525[Object.keys(ad.ots_525)] != 0">-->
                          <!--                            <v-flex xs8>-->
                          <!--                              <v-subheader>-->
                          <!--                                Отсек 5,25-->
                          <!--                              </v-subheader>-->
                          <!--                            </v-flex>-->
                          <!--                            <v-flex xs3>-->
                          <!--                              <v-container fluid>-->
                          <!--                                <v-text-field suffix="шт."-->
                          <!--                                              type="number"-->
                          <!--                                              min="0"-->
                          <!--                                              v-model="selectDopBay"-->
                          <!--                                              :max="ad.ots_525[Object.keys(ad.ots_525)]"-->
                          <!--                                              onkeydown="return false"-->
                          <!--                                ></v-text-field>-->
                          <!--                              </v-container>-->
                          <!--                            </v-flex>-->
                          <!--                          </template>-->

                          <!--                          <template v-if="ad.ots_525[Object.keys(ad.ots_525)] != 0">-->
                          <!--                            <v-flex xs8>-->
                          <!--                              <v-subheader>-->
                          <!--                                Отсек 5,25-->
                          <!--                              </v-subheader>-->
                          <!--                            </v-flex>-->
                          <!--                            <v-flex xs2 v-if="ad.ots_525[Object.keys(ad.ots_525)] != 'standart'">-->
                          <!--                              <v-switch :label="''"-->
                          <!--                                        v-model="switch7"-->
                          <!--                                        height="3px"-->
                          <!--                                        @change="ad.ots_525[Object.keys(ad.ots_525)] ? selectDopBay = 1  :selectCountSlimDvd = 0"-->
                          <!--                              ></v-switch>-->
                          <!--                            </v-flex>-->
                          <!--                            <v-flex xs2 v-if="ad.ots_525[Object.keys(ad.ots_525)] == 'standart'">-->
                          <!--                              <v-card-text>-->
                          <!--                                <v-text-field type="text"-->
                          <!--                                              :disabled="ad.ots_525[Object.keys(ad.ots_525)] == 'standart'"-->
                          <!--                                              v-model="standartDopBay"-->
                          <!--                                              height="11px"-->
                          <!--                                              onkeydown="return false"-->
                          <!--                                ></v-text-field>-->
                          <!--                              </v-card-text>-->
                          <!--                            </v-flex>-->
                          <!--                            <v-flex xs2 v-else-if="switch7">-->
                          <!--                              <v-card-text>-->
                          <!--                                <v-text-field type="number"-->
                          <!--                                              suffix="шт."-->
                          <!--                                              :max="ad.ots_525[Object.keys(ad.ots_525)]"-->
                          <!--                                              min="1"-->
                          <!--                                              v-model="selectDopBay"-->
                          <!--                                              height="11px"-->
                          <!--                                              onkeydown="return false"-->
                          <!--                                ></v-text-field>-->
                          <!--                              </v-card-text>-->
                          <!--                            </v-flex>-->

                          <!--                          </template>-->

                          <template v-if="ad.slim_dvd[Object.keys(ad.slim_dvd)] != 0">
                            <v-flex xs8>
                              <v-subheader>
                                SlimDVD привод
                              </v-subheader>
                            </v-flex>
                            <v-flex xs2 v-if="ad.slim_dvd[Object.keys(ad.slim_dvd)] != 'standart'">
                              <v-switch :label="''"
                                        v-model="switch5"
                                        height="3px"
                                        @change="ad.slim_dvd[Object.keys(ad.slim_dvd)] ? selectCountSlimDvd = 1  :selectCountSlimDvd = 0"
                              ></v-switch>
                            </v-flex>
                            <v-flex xs2 v-if="ad.slim_dvd[Object.keys(ad.slim_dvd)] == 'standart'">
                              <v-card-text>
                                <v-text-field type="text"
                                              :disabled="ad.slim_dvd[Object.keys(ad.slim_dvd)] == 'standart'"
                                              v-model="standartDVD"
                                              height="11px"
                                              onkeydown="return false"
                                ></v-text-field>
                              </v-card-text>
                            </v-flex>
                            <v-flex xs2 v-else-if="switch5">
                              <v-card-text>
                                <v-text-field type="number"
                                              suffix="шт."
                                              :max="ad.slim_dvd[Object.keys(ad.slim_dvd)]"
                                              min="1"
                                              v-model="selectCountSlimDvd"
                                              height="11px"
                                              onkeydown="return false"
                                ></v-text-field>
                              </v-card-text>
                            </v-flex>

                          </template>

                          <!--                          <template v-if="ad.usb_com[Object.keys(ad.usb_com)] != 0">-->
                          <!--                            <v-flex xs8>-->
                          <!--                              <v-subheader>-->
                          <!--                                Планка 2 порта USB, 1 порт COM-->
                          <!--                              </v-subheader>-->
                          <!--                            </v-flex>-->

                          <!--                            <v-flex xs2 v-if="ad.usb_com[Object.keys(ad.usb_com)] != 'standart'">-->
                          <!--                              <v-switch :label="''"-->
                          <!--                                        v-model="switch6"-->
                          <!--                                        height="3px"-->
                          <!--                                        @change="ad.usb_com[Object.keys(ad.usb_com)] ? selectCountUsbCom = 1  :selectCountUsbCom = 0"-->
                          <!--                              ></v-switch>-->
                          <!--                            </v-flex>-->

                          <!--                            <v-flex xs2 v-if="ad.usb_com[Object.keys(ad.usb_com)] == 'standart'">-->
                          <!--                              <v-card-text>-->
                          <!--                                <v-text-field type="text"-->
                          <!--                                              :disabled="ad.usb_com[Object.keys(ad.usb_com)] == 'standart'"-->
                          <!--                                              v-model="standartUsb"-->
                          <!--                                              height="11px"-->
                          <!--                                              onkeydown="return false"-->
                          <!--                                ></v-text-field>-->
                          <!--                              </v-card-text>-->
                          <!--                            </v-flex>-->
                          <!--                            <v-flex xs2 v-else-if="switch6">-->
                          <!--                              <v-card-text>-->
                          <!--                                <v-text-field type="number"-->
                          <!--                                              suffix="шт."-->
                          <!--                                              :max="ad.usb_com[Object.keys(ad.usb_com)]"-->
                          <!--                                              min="1"-->
                          <!--                                              v-model="selectCountUsbCom"-->
                          <!--                                              height="11px"-->
                          <!--                                              onkeydown="return false"-->
                          <!--                                ></v-text-field>-->
                          <!--                              </v-card-text>-->
                          <!--                            </v-flex>-->
                          <!--                          </template>-->

                        </v-layout>
                      </v-container>
                    </v-card-actions>
                  </v-card>

                  <v-card>
                    <v-card-actions>
                      <v-container>
                        <v-layout wrap>

                          <v-flex xs6 align-self-center>
                            <v-subheader>Программа гарантийной поддержки</v-subheader>
                          </v-flex>
                          <v-flex xs3>
                            <v-select
                              :items="getWarrantyProgram"
                              v-model="selectWarrantyProgram"
                              class="input-group--focused"
                              item-value="text"
                              label="Выберите гарантийную программу"
                            ></v-select>
                          </v-flex>

                          <v-flex xs8>
                            <v-subheader>Сохранение неисправных носителей</v-subheader>
                          </v-flex>
                          <v-flex xs3>
                            <v-switch :label="''" v-model="SavingBad" value="Да"></v-switch>
                          </v-flex>

                          <v-flex ml-3>
                            <v-layout>
                              <a class="font-italic" style="text-decoration: underline" @click="getPDF">Описание
                                гарантийных программ</a>
                            </v-layout>
                          </v-flex>

                        </v-layout>
                      </v-container>
                    </v-card-actions>

                  </v-card>
                  <v-card>
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">Ваш комментарий</h3>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      <v-textarea
                        solo
                        name="comments"
                        label="В данном разделе вы можете указать любую дополнительную информацию"
                        v-model="comments"
                      ></v-textarea>
                    </v-card-text>
                  </v-card>
                  <template v-if="!getId && resultShow">
                    <p class="text-xs-right subheading" style="margin-right: 70px;color: red">Для добавления товара в
                      корзину:</p>
                  </template>
                </v-layout>

              </v-layout>

              <v-card-actions>
                <v-spacer></v-spacer>

                <template v-if="resultShow">
                  <v-flex xs1>
                    <v-text-field
                      label="кол-во"
                      suffix="шт."
                      type="number"
                      min="1"
                      v-model="countTovar"
                      style="width:70px;"
                    ></v-text-field>
                  </v-flex>
                  <template v-if="getId  && processor">
                    <app-buy-modal style="margin-right: 10px" :ad="ad" :MyRules="MyRules" :getJsonBuy="getJsonBuy"
                    ></app-buy-modal>
                  </template>
                  <template v-else-if="getId  && !processor">
                    <p style="color: red">Заполните все обязательные поля</p>
                  </template>

                  <template v-else>

                    <v-btn to="/registration">Зарегистрируйтесь</v-btn>
                    <v-btn to="/login">Авторизируйтесь</v-btn>
                  </template>
                </template>

              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item
            :value="'tab-' + 2"
          >
            <app-select-param :processor="processor"
                              :countProc="selectProc"
                              :selectOs="selectOs"
                              :asdMemorys="asdMemorys"
                              :network="network"
                              :selectNetwork="selectNetwork"
                              :selectHba="selectHba"
                              :countSelectHba="countSelectHba"
                              :selectRaidController="selectRaidController"
                              :countSelectRaidController="countSelectRaidController"
                              :selectWarrantyProgram="selectWarrantyProgram"
                              :selectSistemNakopitel="selectSistemNakopitel"
                              :selectSistemNakopitelMemory="selectSistemNakopitelMemory"
                              :dopSystemMemoryCount="dopSystemMemoryCount"
                              :selectTransceiver="selectTransceiver"
                              :selectHbaTransceiver="selectHbaTransceiver"
                              :dataProtection="dataProtection"
                              :SavingBad="SavingBad"
                              :valueObjFormFactor="valueObjFormFactor"
                              :selectCountUsbCom="selectCountUsbCom"
                              :selectCountSlimDvd="selectCountSlimDvd"
                              :selectDopBay="selectDopBay"
            >
            </app-select-param>

          </v-tab-item>
        </v-tabs>

      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['id', 'categoryId'],

    data() {
      return {
        rules: {
          required: value => !!value || 'Необходимо заполнить.',
        },
        valid: false,
        procArray: [],
        countTovar: 1,
        comments: '',
        tabs: ['Конфигуратор', 'Технические характеристики'],
        SuperDOM: [],
        SATA: [],
        SAS: [],
        asdMemorys: 1,
        processor: '',
        hotSwap: '',
        switch1: '',
        switch2: '',
        SavingBad: '',
        switch4: '',
        switch5: '',
        switch6: '',
        switch7: '',
        network: '',
        selectTransceiver: [
          {"id": 1, "name1": '', "volume1": 0},

        ],
        selectHbaTransceiver: [
          {"id": 1, "name1": '', "volume1": 0},

        ],
        dataProtection: false,
        selectOs: '',
        selectFormFactor: '',
        selectRaidController: '',
        countSelectRaidController: 0,
        selectHba: '',
        countSelectHba: 0,
        selectSatSas: '',
        selectDisksValue: '',
        selectCountDisksValue: 0,
        limitSlots: 0,
        selectNetwork: 0,
        selectDopBay: '',
        valueFormFactor: [1,],
        dopSystemMemoryCount: 0,
        countForm: 1,
        countTransiver: 1,
        countTransiverHBA: 1,
        valueObjFormFactor: [
          {
            "id": 1,
            "name1": '',
            "sata/sas1": '',
            "memory1": '',
            "volume1": 0
          },
        ],
        selectSistemNakopitel: '',
        selectSistemNakopitelMemory: '',
        selectCountUsbCom: '',
        selectCountSlimDvd: '',
        jsonBuy: [],
        posts: [],
        error: [],
        resultShow: true,
        selectProc: 1,
        selectWarrantyProgram: 'Basic 3 года',
        filterDisk_2_5: [],
        filterDisk_3_5: []
      }
    },
    computed: {
      standartUsb() {
        if (this.ad.usb_com[Object.keys(this.ad.usb_com)] == 'standart') {
          this.selectCountUsbCom = '1 шт. Стандартная комплектация'
        }
        return '1 шт. Стандарт'
      },
      standartDVD() {
        if (this.ad.slim_dvd[Object.keys(this.ad.slim_dvd)] == 'standart') {
          this.selectCountSlimDvd = '1 шт. Стандартная комплектация'
        }
        return '1 шт. Стандарт'
      },
      standartDopBay() {
        if (this.ad.ots_525[Object.keys(this.ad.ots_525)] == 'standart') {
          this.selectDopBay = '1 шт. Стандартная комплектация'
        }
        return '1 шт. Стандарт'
      },
      maxTransiver() {
        let sumSelectTransiver = 0;
        this.selectTransceiver.forEach((element, i) => {
          sumSelectTransiver += +element['volume' + element['id']]
        });
        console.log(sumSelectTransiver);

        return sumSelectTransiver
      },
      maxHbaTransiver() {
        let sumSelectTransiver = 0;
        this.selectHbaTransceiver.forEach((element, i) => {
          sumSelectTransiver += +element['volume' + element['id']]
        });
        console.log(sumSelectTransiver);

        return sumSelectTransiver
      },
      getOpisanie() {
        let name = [];
        Object.keys(this.ad.description['dcc']).forEach(element => {
          if (element == '3,5\"') {
            name.push('стандартного форм-фактора (3,5”)')
          }
          if (element == '2,5\"') {
            name.push('малого форм-фактора (2,5”)')
          }
        });
        return name
      },
      getWarrantyProgram() {
        return this.$store.getters.warrantyProgram
      },
      getRaid() {
        let raid = this.$store.getters.raid,
          raidArr = [];
        if (raid) {
          raid.forEach(element => {
            raidArr.push(Object.keys(element)[0]);
          });
        }
        return raidArr
      },
      getCasRaid() {
        let raid = this.$store.getters.raid;
        let gate = '';
        raid.forEach(element => {
          if (element[this.selectRaidController] == 'true') {
            gate = true
          }
        });
        return gate
      },
      getSuperDomValue() {
        return this.$store.getters.superDomValue
      },
      // getDisksValue() {
      //   return this.$store.getters.disksValue
      // },
      getNetwork() {
        return this.$store.getters.network
      },
      getOs() {
        return this.$store.getters.os
      },
      getHba() {
        let name = [];
        if (this.$store.getters.hba) {
          this.$store.getters.hba.forEach(element => {
            name.push(Object.keys(element)[0]);
          });
        }
        return name
      },
      getHbaValue() {
        return this.$store.getters.hba.filter(element => {
          return Object.keys(element)[0] == this.selectHba
        });
      },
      getTransiver() {
        return this.$store.getters.transiver
      },
      getMaxDisk() {

        if (this.selectSistemNakopitel != 'не выбран') {
          if (this.selectSistemNakopitel == '2 HDD 2,5" Hot-Swap') {
            return this.ad['disk_controllers'].filter(element => {
              return Object.keys(element) == 'back_dd'
            })
          } else {
            return this.ad['disk_controllers'].filter(element => {
              return Object.keys(element) == this.selectSistemNakopitel
            })
          }
        }

      },
      getValueDisk() {
        this.disk.forEach(disk => {
          if (Object.keys(disk) == "2,5'") {
            this.filterDisk_2_5.push(Object.values(disk))
          } else if (Object.keys(disk) == "3,5'") {
            this.filterDisk_3_5.push(Object.values(disk))
          }
        })
        this.filterDisk_2_5 = [...new Set(this.filterDisk_2_5)];
        this.filterDisk_2_5 = this.filterDisk_2_5.sort(function (a, b) {
          return a - b;
        });
        this.filterDisk_3_5 = [...new Set(this.filterDisk_3_5)];
        this.filterDisk_3_5 = this.filterDisk_3_5.sort(function (a, b) {
          return a - b;
        });
      },
      loading() {
        return this.$store.getters.loading
      },
      ad() {
        return this.$store.getters.adById;
      },
      maxDisk() {
        let maxDisk = 0;
        maxDisk += +this.ad.dd.fixed['2,5\"'];
        maxDisk += +this.ad.dd.fixed['3,5\"'];
        maxDisk += +this.ad.dd.hot_swap['2,5\"'];
        maxDisk += +this.ad.dd.hot_swap['3,5\"'];
        console.log(maxDisk)
        return maxDisk
      },
      formFactors() {
        let formFactor = [],
          list = ['2,5\"', '3,5\"'];

        for (var element in list) {
          if (this.ad.dd.fixed[list[element]] != 0) {
            formFactor.push(list[element])
          }
        }
        for (var elements in list) {
          if (this.ad.dd.hot_swap[list[elements]] != 0) {
            formFactor.push(list[elements])
          }
        }
        if (formFactor.indexOf('3,5\"') != -1) {
          formFactor.unshift('2,5\"')
        }
        return formFactor
      },
      satSas() {
        let sataSas = [];
        for (let controller in this.ad.disk_controllers) {
          let obj = this.ad.disk_controllers[controller];
          if (['SATA', 'SAS'].includes(Object.keys(obj)[0])) {
            sataSas.push(Object.keys(obj))
            console.log(Object.keys(obj))
            // if (obj[Object.keys(obj)[0]] != 0) {
            //   sataSas.push(Object.keys(obj)[0])
            // }
          }
        }
        return sataSas
      },
      spisokSistemNakopitel() {
        let name = ['не выбран'];
        this.ad['disk_controllers'].forEach(element => {
          if (+element['SuperDOM']) {
            name.push('SuperDOM')
          }
          if (+element['back_dd']) {
            name.push('2 HDD 2,5" Hot-Swap')
          }
        });
        return name
      },
      disk() {
        return this.$store.getters.disk
      },

      lineProc() {
        return this.$store.getters.lineproc
      },
      countProc() {
        let proc = {'Двухпроцессорный': 2, 'Однопроцессорный': 1};
        return proc[this.ad.pr_count]
      },
      getVolumeNetwork() {
        if (this.network != '') {
          let oo = this.getNetwork.filter(element => {
            return Object.keys(element)[0] == this.network
          });
          console.log(oo[0])
          return oo[0]
        }
        return 1
      },
      limitSlot() {
        let busy = {'corpus': 0, "materinka": 0};

        busy['corpus'] += this.Protection();

        busy['corpus'] += +this.selectNetwork;
        busy['materinka'] += +this.selectNetwork;

        busy['corpus'] += +this.countSelectRaidController;
        busy['materinka'] += +this.countSelectRaidController;

        busy['corpus'] += +this.countSelectHba;
        busy['materinka'] += +this.countSelectHba;

        return busy
      },

      MyRules() {
        let result = {};
        if (this.limitSlot['corpus'] > this.ad.count_cc) {
          result['corpus'] = "Превышенно количество слотов в корпусе\n"
        }
        if (this.limitSlot['materinka'] > this.ad.count_mp) {
          result['materinka'] = "Превышенно количество слотов в материнской плате\n"

        }
        if (this.getSelectAllFormFactor > this.maxDisk) {
          result['disk'] = "Выбрано максимально допустимое количество накопителей\n"

        }
        if (Object.keys(result).length != 0) {
          this.resultShow = false;
          return result
        } else {
          this.resultShow = true;
        }
      },
      getSelectAllFormFactor() {
        return this.$store.getters.getSelectAllFormFactor(this.valueObjFormFactor)
      },
      getMemory() {
        return this.$store.getters.getMemory(this.ad)
      },
      getServer() {
        return this.$store.getters.server
      },
      getId() {
        if (this.$store.getters.user) {
          return this.$store.getters.user.id
        }
      },
    },
    methods: {

      getChangeNetwork() {
        this.selectTransceiver = [
          {"id": 1, "name1": '', "volume1": 0},
        ]
        if (this.network != 'не выбран') {
          this.selectNetwork = 1
        } else {
          this.selectNetwork = 0
        }

      },
      clearVolumeHoarder() {
        if (this.selectSistemNakopitel == 'не выбран') {
          this.selectSistemNakopitelMemory = 0
          this.dopSystemMemoryCount = 0
        } else {
          this.dopSystemMemoryCount = 1
        }
      },
      clearCountHba() {
        this.selectHbaTransceiver = [
          {"id": 1, "name1": '', "volume1": 0},
        ]
        if (this.selectHba != 'Не выбран') {
          this.countSelectHba = 1
        } else {
          this.countSelectHba = 0
        }
      },
      MaxDisks(model) {
        if (this.getMaxDisk != undefined) {
          return this.getMaxDisk.length == 0 ? 0 : this.getMaxDisk[0][model]
        }
      },
      clearSystemHoarder() {
        if (!this.switch4) {
          this.selectSistemNakopitel = 'не выбран';
          this.dopSystemMemoryCount = 0;
          this.selectSistemNakopitelMemory = 0
        }
      },
      getOneCount(model, pole) {
        if (model['name'] != 'Без трансиверов') {
          pole = 1
        } else {
          pole = 0
        }
      },
      getMaxCount(model) {
        if (this.ad.count_cc == this.limitSlot['corpus'] && this.ad.count_mp == this.limitSlot['materinka']) {
          return model
        } else if (this.ad.count_cc == this.limitSlot['corpus']) {
          return model
        } else if (this.ad.count_mp == this.limitSlot['materinka']) {
          return model
        } else {
          if (this.ad.count_cc < this.ad.count_mp) {
            return this.ad.count_cc
          } else {
            return this.ad.count_mp
          }
        }
      },
      getPDF() {
        axios({
          url: 'http://192.168.54.253:8777/doc',
          method: 'GET',
          responseType: 'blob', // important
        }).then((response) => {
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      },
      getNameNetwork() {
        let nameArr = [];

        for (let i = 0; i < this.getNetwork.length; i++) {
          for (name in this.getNetwork[i]) {
            nameArr.push(name)
          }
        }
        return nameArr
      },
      Protection() {
        let count = 0;
        if (this.dataProtection == 'да') {
          count += 1;
          return count
        } else {
          return count
        }
      },
      countMinusFormFactor(id) {
        for (let i in this.valueObjFormFactor) {

          if (this.valueObjFormFactor[i]['id'] == id) {
            this.valueObjFormFactor.splice(this.valueObjFormFactor.indexOf(this.valueObjFormFactor[i]), 1)
          }
        }
      },
      countMinusTransiver(id) {
        if (this.selectTransceiver.length > 1) {
          for (let i in this.selectTransceiver) {

            if (this.selectTransceiver[i]['id'] == id) {
              this.selectTransceiver.splice(this.selectTransceiver.indexOf(this.selectTransceiver[i]), 1)
            }
          }
        }
      },
      countMinusTransiverHBA(id) {
        if (this.selectHbaTransceiver.length > 1) {
          for (let i in this.selectHbaTransceiver) {

            if (this.selectHbaTransceiver[i]['id'] == id) {
              this.selectHbaTransceiver.splice(this.selectHbaTransceiver.indexOf(this.selectHbaTransceiver[i]), 1)
            }
          }
        }

      },
      PlusObjFactor() {
        let objectMy = {};
        this.countForm += 1;

        objectMy['id'] = this.countForm;
        objectMy['name' + this.countForm] = '';
        objectMy['sata/sas' + this.countForm] = '';
        objectMy['memory' + this.countForm] = '';
        objectMy['volume' + this.countForm] = 0;

        this.valueObjFormFactor.push(objectMy)
      },
      PlusTransiver() {
        let objectMy = {};
        this.countTransiver += 1;

        objectMy['id'] = this.countTransiver;
        objectMy['name' + this.countTransiver] = '';
        objectMy['volume' + this.countTransiver] = 0;

        this.selectTransceiver.push(objectMy)
      },
      PlusTransiverHBA() {
        let objectMy = {};
        this.countTransiverHBA += 1;

        objectMy['id'] = this.countTransiver;
        objectMy['name' + this.countTransiver] = '';
        objectMy['volume' + this.countTransiver] = 0;

        this.selectHbaTransceiver.push(objectMy)
      },
      getJsonBuy() {
        let date = new Date(),
          dd = date.getDate(),
          mm = date.getMonth() + 1,
          yy = date.getFullYear() % 100;

        let podsistems = {},
          transiver = {},
          hbaTransiver = {};

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        if (yy < 10) yy = '0' + yy;
        let servBuy = {
          "user_id": this.$store.getters.user.id,
          "server_id": `${this.ad._id}`,
          "server_date": `${date}`,
          "server_name": `${this.ad.name}`,
          "server_corp": `${this.ad.server_corp}`,
          "server_type": `${this.ad.corp_type}`,
          "server_mp": `${this.ad.server_mp}`,
          "attributes": [
            {
              category: "Процессор",
              name: "Процессор",
              value: `${this.processor}`,
              count: `${this.selectProc}`
            },
            {
              category: "Оперативная память",
              name: "Оперативная память",
              value: 'Объем',
              count: `${this.asdMemorys}`
            },
            {
              category: "Операционная система",
              name: "Операционная система",
              value: `${this.selectOs}`,
              count: ''
            },
            {
              category: "Системный накопитель",
              name: this.selectSistemNakopite == 'не выбран' ? '' : `${this.selectSistemNakopitel}`,
              value: `${this.selectSistemNakopitelMemory}`,
              count: `${this.dopSystemMemoryCount}`
            },
            {
              category: "Сетевая карта",
              name: "Сетевая карта",
              value: `${this.network}`,
              count: `${this.selectNetwork}`
            },
            {
              category: "HBA",
              name: "HBA",
              value: `${this.selectHba}`,
              count: `${this.countSelectHba}`
            },
            {
              category: "RAID Контроллер",
              name: "RAID Контроллер",
              value: `${this.selectRaidController}`,
              count: `${this.countSelectRaidController}`
            },
            {
              category: "Защита кэшированных данных",
              name: "Защита кэшированных данных",
              value: this.dataProtection ? `${this.dataProtection}` : "Нет",
              count: ``
            },
            {
              category: "Гарантийная программа",
              name: "Гарантийная программа",
              value: `${this.selectWarrantyProgram}`,
              count: ''
            },
            // {
            //   category: "Отсек 5,25",
            //   name: "Отсек 5,25",
            //   value: `${this.selectDopBay}`,
            //   count: ''
            // },
            {
              category: "SlimDVD привод",
              name: "SlimDVD привод",
              value: `${this.selectCountSlimDvd}`,
              count: ''
            },
            // {
            //   category: "Планка 2 порта USB, 1 порт COM",
            //   name: "Планка 2 порта USB, 1 порт COM",
            //   value: `${this.selectCountUsbCom}`,
            //   count: ''
            // },
            {
              category: "Сохранение неисправных носителей",
              name: "Сохранение неисправных носителей",
              value: this.SavingBad ? `${this.SavingBad}` : "Нет",
              count: ''
            },
          ],
          "disks": [],
          "count_position": `${this.countTovar}`,
          "comments_position": `${this.comments}`,
        };
        this.selectTransceiver.forEach(element => {
          if (element['volume'] != 0) {
            transiver = {
              category: "Трансивер",
              name: "Трансивер",
              value: `${element['name' + element['id']]}`,
              count: `${element['volume' + element['id']]}`
            };
            servBuy['attributes'].push(transiver)
          }
        });

        this.selectHbaTransceiver.forEach(element => {
          if (element['volume'] != 0) {
            hbaTransiver = {
              category: "HBA трансивер",
              name: "HBA трансивер",
              value: `${element['name' + element['id']]}`,
              count: `${element['volume' + element['id']]}`
            };
            servBuy['attributes'].push(hbaTransiver)
          }
        });

        for (let i in this.valueObjFormFactor) {
          podsistems = {
            form: `${this.valueObjFormFactor[i]["name" + this.valueObjFormFactor[i]["id"]]}`,
            interface: `${this.valueObjFormFactor[i]["sata/sas" + this.valueObjFormFactor[i]["id"]]}`,
            value: `${this.valueObjFormFactor[i]["memory" + this.valueObjFormFactor[i]["id"]]}`,
            count: `${this.valueObjFormFactor[i]["volume" + this.valueObjFormFactor[i]["id"]]}`
          };

          servBuy["disks"].push(podsistems)
        }

        console.log(servBuy)
        this.jsonBuy.push(servBuy);
        return servBuy
      },
    },
    created() {
      this.$store.dispatch('adAllJson', this.id);
      if (this.$store.getters.user) {
        this.$store.dispatch('getTovarsJson', this.$store.getters.user.id);
      }
    },
    name: "Ad",

  }
</script>

<style scoped>
  .v-card {
    margin-bottom: 10px !important;
  }

  .pading {
    padding-left: 15px;
    color: rgba(137, 137, 137, 1);
  }

  .v-text-field__slot input {
    text-align: center;
    padding: 0;
  }

  .v-subheader {
    font-size: 16px;
    color: #78909C !important;
  }

  .flex {
    max-height: 70px;
    align-self: center;
  }

  .titulImage {
    margin-right: 40px;
    margin-left: 50px;
  }

  .HoverOrange:hover {
    background: #FFCC80 !important;
    color: black !important;
  }
</style>
