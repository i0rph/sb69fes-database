<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.music.title') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.music.title') }}</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-3 col-5 pl-0 mr-1">
          <base-input-light alternative formGroupClasses="my-0" v-model="keyword">
            <template slot="append">
              <el-popover placement="bottom-end" width="405">
                <div class="row px-2 pb-2 mx-auto">
                  <label class="col-12 col-form-label form-control-label">{{ $t('attribute.label') }}</label>
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
                  <label class="col-12 col-form-label form-control-label">{{ $t('sort.band') }}</label>
                  <div class="col mb-2">
                    <el-select clearable multiple collapse-tags v-model="artist" :placeholder="$t('sort.band')">
                      <el-option v-for="_artist in artists" :key="_artist.id" :value="_artist.id" :label="_artist.label">
                        <span>{{ _artist.label }}</span>
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
                    <base-radio class="mx-1 d-inline-block mb-1" name="name" v-model="sortBy"><span>{{ $t('sort.title') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="artist_id" v-model="sortBy"><span>{{ $t('sort.band') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="category" v-model="sortBy"><span>{{ $t('sort.attribute') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="length" v-model="sortBy"><span>{{ $t('sort.length') }}</span></base-radio>
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
      <div class="row px-2">
        <div class="col-12 col-lg-4" v-for="music in musicsFiltered" :key="music.id">
          <nuxt-link :to="localePath(`/music/${music.id}`)">
            <card>
              <div class="row">
                <div class="col-auto">
                  <img v-lazy="`image/musicjacket/${music.jacket_image_id}`"
                       class="shadow shadow-lg--hover"
                       style="width:122px; height:122px; object-fit:cover; object-position:top;">
                </div>
                <div class="col-6 col-lg my-auto">
                  <h3 class="d-inline-block mb-0"><img :src="`asset/cardicons/attribute_${music.category}.png`" style="width: 20px;">
                    <template v-if="music.translation && music.translation[$i18n.locale] && music.translation[$i18n.locale].name">
                      <small class="d-block font-weight-bolder mt-1" style="font-size: 0.675rem !important;" v-if="$store.state.showJP">{{music.name}}</small>
                      {{music.translation[$i18n.locale].name}}
                    </template>
                    <template v-else>
                      {{music.name}}
                    </template>
                  </h3>
                  <h5 class="mb-0">{{ artistConst[music.artist_id] }}</h5>
                </div>
              </div>
            </card>
          </nuxt-link>
        </div>
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
        title: this.$t('page.music.title'),
        titleTemplate: `%s | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.music.title'), hid: 'og:title', template: chunk => `${chunk} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    asyncData ({ $axios }) {
      return $axios.$get(`/api/music`)
        .then(data => {
          return {
            musics: data
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
          99: this.$t('artist.independent'),
        }
      }
    },
    mounted() {
      //
    },
    methods: {
      compareMusics(a,b) {
        if (this.$store.state.musicFilter.sortBy === 'title') return a.name.localeCompare(b.name) * this.$store.state.musicFilter.sortOrder
        else if (a[this.$store.state.musicFilter.sortBy] < b[this.$store.state.musicFilter.sortBy]) return -1 * this.$store.state.musicFilter.sortOrder
        else if (a[this.$store.state.musicFilter.sortBy] > b[this.$store.state.musicFilter.sortBy]) return 1 * this.$store.state.musicFilter.sortOrder
        return 0
      },
      checktr(obj, params) {
        return obj.translation ? obj.translation[this.$i18n.locale] ? obj.translation[this.$i18n.locale][params] ? obj.translation[this.$i18n.locale][params].toLowerCase().includes(this.keyword.toLowerCase()) : false : false : false
      }
    },
    computed: {
      musicsFiltered() {
        let musics = this.musics.sort((a,b) => {
          return this.compareMusics(a,b)
        })
        
        if (this.$store.state.musicFilter.attribute.length) {
          musics = musics.filter(music => {
            return this.$store.state.musicFilter.attribute.includes(music.category)
          })
        }
        
        if (this.$store.state.musicFilter.artist.length) {
          musics = musics.filter(music => {
            return this.$store.state.musicFilter.artist.includes(String(music.artist_id))
          })
        }
        
        return musics.filter(music => {
          return (music.name.toLowerCase().includes(this.keyword.toLowerCase()) || this.checktr(music, 'name'))
        })
      },
      artists() {
        let artistArr = []
        for (let [key, artist] of Object.entries(this.artistConst)) {
          artistArr.push({id: key, label: artist})
        }
        return artistArr
      },
      ...mapFields([
        'musicFilter.attribute',
        'musicFilter.artist',
        'musicFilter.sortOrder',
        'musicFilter.sortBy'
      ])
    }
  };
</script>
<style>
</style>
