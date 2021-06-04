<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.bromide.title') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.bromide.title') }}</li>
            </ol>
          </nav>
        </div>
        <div class="col-auto">
          <i class="fas fa-th" @click="grid = 'thumbnail'"></i>
          <i class="fas fa-th-list px-1" @click="grid = 'list'"></i>
        </div>
        <div class="col-lg-3 col-5 pl-0">
          <base-input-light alternative formGroupClasses="my-0" v-model="keyword">
            <template slot="append">
              <el-popover placement="bottom-end" width="405">
                <div class="row px-2 pb-2 mx-auto">
                  <label class="col-12 col-form-label form-control-label">{{ $t('sort.rarity') }}</label>
                  <div class="col mb-2">
                    <base-checkbox-light class="mx-1 d-inline-block" :value="5" v-model="rarity"><span>UR</span></base-checkbox-light>
                    <base-checkbox-light class="mx-1 d-inline-block" :value="4" v-model="rarity"><span>SSR</span></base-checkbox-light>
                    <base-checkbox-light class="mx-1 d-inline-block" :value="3" v-model="rarity"><span>SR</span></base-checkbox-light>
                    <base-checkbox-light class="mx-1 d-inline-block" :value="2" v-model="rarity"><span>RR</span></base-checkbox-light>
                    <base-checkbox-light class="mx-1 d-inline-block" :value="1" v-model="rarity"><span>R</span></base-checkbox-light>
                  </div>
                  <label class="col-12 col-form-label form-control-label">{{ $t('sort.attribute') }}</label>
                  <div class="col mb-2">
                    <base-checkbox-light class="d-inline-block mr-1" :value="1" v-model="attribute">
                      <img :src="`asset/cardicons/attribute_1.png`" style="width: 20px;" class="ml--2">
                      <span> {{ $t('attribute[1]') }}</span>
                    </base-checkbox-light>
                    <base-checkbox-light class="d-inline-block mr-1" :value="2" v-model="attribute">
                      <img :src="`asset/cardicons/attribute_2.png`" style="width: 20px;" class="ml--2">
                      <span> {{ $t('attribute[2]') }}</span>
                    </base-checkbox-light>
                    <base-checkbox-light class="d-inline-block" :value="3" v-model="attribute">
                      <img :src="`asset/cardicons/attribute_3.png`" style="width: 20px;" class="ml--2">
                      <span> {{ $t('attribute[3]') }}</span>
                    </base-checkbox-light>
                  </div>
                  <label class="col-12 col-form-label form-control-label">{{ $t('sort.character') }}</label>
                  <div class="col mb-2">
                    <el-select clearable multiple collapse-tags v-model="character" :placeholder="$t('sort.character')">
                      <el-option v-for="character in characters" :key="character.id" :value="character.id" :label="character.label">
                        <span style="float: left">{{ character.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px;" class="px-3">{{ artistConst[character.artist_id] }}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <label class="col-12 col-form-label form-control-label">{{ $t('sort.label') }}</label>
                  <div class="col-12 mb-2">
                    <base-radio class="mx-1 d-inline-block mb-1" name="1" v-model="sortOrder"><span>{{ $t('sort.ascending') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="-1" v-model="sortOrder"><span>{{ $t('sort.descending') }}</span></base-radio>
                  </div>
                  <div class="col mb-2">
                    <base-radio class="mx-1 d-inline-block mb-1" name="id" v-model="sortBy"><span>{{ $t('sort.id') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="rarity" v-model="sortBy"><span>{{ $t('sort.rarity') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="name" v-model="sortBy"><span>{{ $t('sort.name') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="myumon_basic_id" v-model="sortBy"><span>{{ $t('sort.character') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="music_category" v-model="sortBy"><span>{{ $t('sort.attribute') }}</span></base-radio>
                  </div>
                  <label class="col-12 col-form-label form-control-label">{{ $t('bromide.filterShinka.label') }}</label>
                  <div class="col-12 mb-2">
                    <base-radio class="mx-1 d-inline-block mb-1" :name="true" v-model="shinka"><span>{{ $t('bromide.filterShinka.yes') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" :name="false" v-model="shinka"><span>{{ $t('bromide.filterShinka.no') }}</span></base-radio>
                  </div>
                </div>
                <i class="fas fa-filter" slot="reference"></i>
              </el-popover>
            </template>
          </base-input-light>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row px-2 justify-content-center">
        <template v-if="$store.state.grid === 'thumbnail'">
          <div class="col-auto" v-for="myumon in myumonsFiltered" :key="myumon.id">
            <nuxt-link :to="localePath(`/bromide/${myumon.id}`)">
              <card body-classes="p-1">
                <img v-lazy="`image/thumbnail/${myumon.id}`"
                     style="width:100px; height:100px;">
              </card>
            </nuxt-link>
          </div>
        </template>
        <template v-if="$store.state.grid === 'list'">
          <div class="col-12 col-md-6 col-lg-4" v-for="myumon in myumonsFiltered" :key="myumon.id">
            <nuxt-link :to="localePath(`/bromide/${myumon.id}`)">
              <card>
                <div class="row">
                  <div class="col-auto">
                    <img v-lazy="`image/thumbnail/${myumon.id}`" style="width:128px;height:128px;">
                  </div>
                  <div class="col my-auto">
                    <h3 class="mb-0" v-if="myumon.translation && myumon.translation[$i18n.locale] && myumon.translation[$i18n.locale].name">
                      <small class="d-block font-weight-bolder" style="font-size: 0.675rem !important;" v-if="showJP">{{myumon.name}}</small>
                      {{myumon.translation[$i18n.locale].name}}
                    </h3>
                    <h3 class="mb-0" v-else>{{myumon.name}}</h3>
                    <h5 class="mb-0">{{ artistConst[characters.find(artistMyumon => artistMyumon.id === myumon.myumon_basic_id).artist_id] }} - {{ characters.find(artistMyumon => artistMyumon.id === myumon.myumon_basic_id).label }}</h5>
                  </div>
                </div>
              </card>
            </nuxt-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import { mapFields } from 'vuex-map-fields';
  import { Select, Option } from 'element-ui';
  
  export default {
    head() {
      return {
        title: this.$t('page.bromide.title'),
        titleTemplate: `%s | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.bromide.title'), hid: 'og:title', template: chunk => `${chunk} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    asyncData ({ $axios }) {
      return $axios.$get(`/api/bromide`)
        .then(data => {
          return {
            myumons: data
          }
        })
        .catch(err => {
          //$sentry.captureException(err)
        })
    },
    components: {
      BaseHeader,
      RouteBreadCrumb,
      [Select.name]: Select,
      [Option.name]: Option
    },
    data() {
      return {
        keyword: '',
        artistConst: {
          1: this.$t('artist.mashumairesh'),
          2: this.$t('artist.plasmagica'),
          3: this.$t('artist.mugenan'),
          4: this.$t('artist.bvl'),
          5: this.$t('artist.reijingsignal'),
          6: this.$t('artist.dokonjofinger'),
          7: this.$t('artist.shingan'),
          8: this.$t('artist.trichronika'),
          9: this.$t('artist.arcareafact'),
          10: this.$t('artist.criticrista'),
          11: this.$t('artist.yokazenohorizon'),
          12: this.$t('artist.shinimonogurui'),
          13: this.$t('artist.uwasanopetals'),
          14: this.$t('artist.ninjinriot'),
          15: this.$t('artist.zerotickholic'),
          18: this.$t('artist.kuronoatmosphere'),
          90: this.$t('artist.special'),
          91: this.$t('artist.amatelast'),
          92: this.$t('artist.gaugastrikes'),
          93: this.$t('artist.shizuku'),
          99: this.$t('artist.independent'),
        },
        characters: [
          {id: 11, artist_id: 1, label: this.$t('character.howan')},
          {id: 12, artist_id: 1, label: this.$t('character.himeko')},
          {id: 13, artist_id: 1, label: this.$t('character.delmin')},
          {id: 14, artist_id: 1, label: this.$t('character.ruhuyu')},
          {id: 21, artist_id: 2, label: this.$t('character.cyan')},
          {id: 22, artist_id: 2, label: this.$t('character.chuchu')},
          {id: 23, artist_id: 2, label: this.$t('character.retoree')},
          {id: 24, artist_id: 2, label: this.$t('character.moa')},
          {id: 31, artist_id: 3, label: this.$t('character.darudayu')},
          {id: 32, artist_id: 3, label: this.$t('character.a')},
          {id: 33, artist_id: 3, label: this.$t('character.un')},
          {id: 41, artist_id: 4, label: this.$t('character.ailane')},
          {id: 42, artist_id: 4, label: this.$t('character.peipain')},
          {id: 43, artist_id: 4, label: this.$t('character.hundrekko')},
          {id: 51, artist_id: 5, label: this.$t('character.rararin')},
          {id: 52, artist_id: 5, label: this.$t('character.sumomone')},
          {id: 53, artist_id: 5, label: this.$t('character.uiui')},
          {id: 61, artist_id: 6, label: this.$t('character.yasu')},
          {id: 62, artist_id: 6, label: this.$t('character.hachin')},
          {id: 63, artist_id: 6, label: this.$t('character.joe')},
          {id: 64, artist_id: 6, label: this.$t('character.sojun')},
          {id: 71, artist_id: 7, label: this.$t('character.crow')},
          {id: 72, artist_id: 7, label: this.$t('character.aion')},
          {id: 73, artist_id: 7, label: this.$t('character.yaiba')},
          {id: 74, artist_id: 7, label: this.$t('character.rom')},
          {id: 81, artist_id: 8, label: this.$t('character.shuuzo')},
          {id: 82, artist_id: 8, label: this.$t('character.kai')},
          {id: 83, artist_id: 8, label: this.$t('character.riku')},
          {id: 91, artist_id: 9, label: this.$t('character.titan')},
          {id: 92, artist_id: 9, label: this.$t('character.orion')},
          {id: 93, artist_id: 9, label: this.$t('character.selen')},
          {id: 94, artist_id: 9, label: this.$t('character.argon')},
          {id: 101, artist_id: 10, label: this.$t('character.rosia')},
          {id: 102, artist_id: 10, label: this.$t('character.tsukino')},
          {id: 103, artist_id: 10, label: this.$t('character.holmy')},
          {id: 104, artist_id: 10, label: this.$t('character.jacklyn')},
          {id: 111, artist_id: 11, label: this.$t('character.rikao')},
          {id: 112, artist_id: 11, label: this.$t('character.jalop')},
          {id: 113, artist_id: 11, label: this.$t('character.kusuka')},
          {id: 114, artist_id: 11, label: this.$t('character.uraragi')},
          {id: 121, artist_id: 12, label: this.$t('character.marimari')},
          {id: 122, artist_id: 12, label: this.$t('character.dyuradyura')},
          {id: 123, artist_id: 12, label: this.$t('character.monmon')},
          {id: 124, artist_id: 12, label: this.$t('character.tsugihagi')},
          {id: 125, artist_id: 12, label: this.$t('character.gashigashi')},
          {id: 131, artist_id: 13, label: this.$t('character.shibarin')},
          {id: 132, artist_id: 13, label: this.$t('character.pokoe')},
          {id: 133, artist_id: 13, label: this.$t('character.kittsun')},
          {id: 134, artist_id: 13, label: this.$t('character.hakkun')},
          {id: 141, artist_id: 14, label: this.$t('character.arashi')},
          {id: 142, artist_id: 14, label: this.$t('character.oboro')},
          {id: 143, artist_id: 14, label: this.$t('character.rin')},
          {id: 144, artist_id: 14, label: this.$t('character.kamui')},
          {id: 151, artist_id: 15, label: this.$t('character.gyarako')},
          {id: 152, artist_id: 15, label: this.$t('character.shimakku')},
          {id: 153, artist_id: 15, label: this.$t('character.reppanyo')},
          {id: 154, artist_id: 15, label: this.$t('character.kiriri')},
          {id: 181, artist_id: 18, label: this.$t('character.919')},
          {id: 182, artist_id: 18, label: this.$t('character.151')},
          {id: 183, artist_id: 18, label: this.$t('character.661')},
          {id: 184, artist_id: 18, label: this.$t('character.659')},
          {id: 185, artist_id: 18, label: this.$t('character.13')},
          {id: 911, artist_id: 91, label: this.$t('character.shuu')},
          {id: 912, artist_id: 92, label: this.$t('character.kintaurus')},
          {id: 913, artist_id: 93, label: this.$t('character.corriente')},
        ]
      }
    },
    mounted() {
      //
    },
    methods: {
      compareMyumons(a,b) {
        if (this.$store.state.bromideFilter.sortBy === 'name') return a.name.localeCompare(b.name) * this.$store.state.bromideFilter.sortOrder
        else if (a[this.$store.state.bromideFilter.sortBy] < b[this.$store.state.bromideFilter.sortBy]) return -1 * this.$store.state.bromideFilter.sortOrder
        else if (a[this.$store.state.bromideFilter.sortBy] > b[this.$store.state.bromideFilter.sortBy]) return 1 * this.$store.state.bromideFilter.sortOrder
        return 0
      },
      checktr(obj, params) {
        return obj.translation ? obj.translation[this.$i18n.locale] ? obj.translation[this.$i18n.locale][params] ? obj.translation[this.$i18n.locale][params].toLowerCase().includes(this.keyword.toLowerCase()) : false : false : false
      }
    },
    computed: {
      myumonsFiltered() {
        let myumons = this.myumons.sort((a,b) => {
          return this.compareMyumons(a,b)
        })
        
        if (this.$store.state.bromideFilter.shinka) {
          myumons = myumons.filter(myumon => {
            return myumon.shinka_myumon_id !== 0
          })
        }
        
        if (this.$store.state.bromideFilter.rarity.length) {
          myumons = myumons.filter(myumon => {
            return this.$store.state.bromideFilter.rarity.includes(myumon.rarity)
          })
        }
        
        if (this.$store.state.bromideFilter.attribute.length) {
          myumons = myumons.filter(myumon => {
            return this.$store.state.bromideFilter.attribute.includes(myumon.music_category)
          })
        }
        
        if (this.$store.state.bromideFilter.character.length) {
          myumons = myumons.filter(myumon => {
            return this.$store.state.bromideFilter.character.includes(myumon.myumon_basic_id)
          })
        }
        
        return myumons.filter(myumon => {
          return (myumon.name.toLowerCase().includes(this.keyword.toLowerCase()) || this.checktr(myumon, 'name'))
        })
      },
      ...mapFields([
        'grid',
        'showJP',
        'bromideFilter.rarity',
        'bromideFilter.attribute',
        'bromideFilter.character',
        'bromideFilter.sortOrder',
        'bromideFilter.sortBy',
        'bromideFilter.shinka'
      ])
    }
  };
</script>
<style>
</style>