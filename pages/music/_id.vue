<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ music.translation[$i18n.locale].name ? music.translation[$i18n.locale].name : music.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`music`)">{{ $t('page.music.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ music.translation[$i18n.locale].name ? music.translation[$i18n.locale].name : music.name }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <card>
            <div class="row justify-content-center pt-lg-3">
              <div class="col-lg-auto col-md-12 mb-3 my-lg-auto">
                <img v-lazy="`image/musicjacket/${music.jacket_image_id}`"
                     class="img-center img-fluid shadow shadow-lg--hover"
                     style="width: 400px;">
              </div>
              <div class="col-lg-6 col-md-12 my-auto">
                <small class="text-sm font-weight-bolder">{{ artist }}</small>
                <h1 class="display-2 mb-0" v-if="music.translation[$i18n.locale].name">
                  <small class="d-block text-sm font-weight-bolder" v-if="$store.state.showJP">{{ music.name }}</small>
                  {{music.translation[$i18n.locale].name}}
                </h1>
                <h1 class="display-2 mb-0" v-else>{{music.name}}</h1>
                <hr class="my-3">
                <base-progress striped showLabel :label="$t('total')" :labelValue="total" type="default" :value="(total / 10)" :height="8"></base-progress>
                <base-progress striped showLabel :label="$t('rhythm')" :labelValue="music.info[difficulty].Rhythm" type="rhythm" :value="(music.info[difficulty].Rhythm / 6)" :height="8"></base-progress>
                <base-progress striped showLabel :label="$t('melody')" :labelValue="music.info[difficulty].Melody" type="melody" :value="(music.info[difficulty].Melody / 6)" :height="8"></base-progress>
                <base-progress striped showLabel :label="$t('harmony')" :labelValue="music.info[difficulty].Harmony" type="harmony" :value="(music.info[difficulty].Harmony / 6)" :height="8"></base-progress>
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto font-weight-bolder">Lv.{{music.info[difficulty].level}}</div>
                  <div class="col-auto pl-0">
                    <button-radio-group :options="difficultys" button-classes="btn-secondary btn-sm mx-1" v-model="difficulty"></button-radio-group>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6 mt-4">
                <vue-plyr :options="{controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'download']}">
                  <audio :src="`asset/music/music${String(this.music.id).padStart(8, '0')}.mp3`"></audio>
                </vue-plyr>
              </div>
            </div>
            <div class="row card-profile-stats justify-content-center pb-0 pt-4">
              <div class="col-6 col-lg-2 p-0 mx-0 mb-4">
                <span class="heading">{{ music.bpm }}</span>
                <span class="description">BPM</span>
              </div>
              <div class="col-6 col-lg-2 p-0 mx-0 mb-4">
                <span class="heading">
                  <el-tooltip :content="$t(`attribute[${music.category}]`)" placement="bottom">
                    <img :src="`asset/cardicons/attribute_${music.category}.png`" style="width: 26px;">
                  </el-tooltip>
                  </span>
                <span class="description">{{ $t('attribute.label') }}</span>
              </div>
              <div class="col-6 col-lg-2 p-0 mx-0 mb-4">
                <span class="heading">{{ musiclength }}</span>
                <span class="description">{{ $t('music.length') }}</span>
              </div>
              <div class="col-6 col-lg-2 p-0 mx-0 mb-4" v-if="music.composed !== '0'">
                <span class="heading">{{ music.composed }}</span>
                <span class="description">{{ $t('music.composed') }}</span>
              </div>
              <div class="col-6 col-lg-2 p-0 mx-0 mb-4" v-if="music.arranged !== '0'">
                <span class="heading">{{ music.arranged }}</span>
                <span class="description">{{ $t('music.arranged') }}</span>
              </div>
              <div class="col-6 col-lg-2 p-0 mx-0 mb-4" v-if="music.lyrics !== '0'">
                <span class="heading">{{ music.lyrics }}</span>
                <span class="description">{{ $t('music.lyrics') }}</span>
              </div>
            </div>
          </card>
          <span class="badge-circle badge-md bg-secondary border-0 text-reset"
                style="position: absolute;right: 4px;top: -12px;box-shadow: rgba(136, 152, 170, 0.875) 0.1rem 0.1rem 0.2rem;"
                @click="initModal" v-if="$store.state.authUser && $store.state.authUser.role.includes('translator')">
            <i class="fas fa-edit"></i>
          </span>
        </div>
      </div>
    </div>
    
    <modal :show.sync="editModal" headerClasses="py-3" bodyClasses="pt-3">
      <template slot="header"><h3 class="mb-0">{{ $t('edit.title') }}</h3></template>
      <form @submit.prevent="translateMusic">
        <div class="form-row">
          <div class="col-12 mb-4">
            <base-input alternative type="text" :label="$t('edit.name')" formGroupClasses="mb-0" v-model="model[$i18n.locale].name"></base-input>
            <small class="text-muted">{{ music.name }}</small>
          </div>
          <div class="col-12 text-center">
            <base-button alternative type="primary" native-type="submit" class="w-100">{{ $t('edit.submit') }}</base-button>
          </div>
        </div>
      </form>
    </modal>
  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import ButtonRadioGroup from '@/components/argon-core/ButtonRadioGroup';
  import Modal from '@/components/argon-core/Modal.vue';
  
  export default {
    head() {
      let title = this.music.translation[this.$i18n.locale].name ? this.music.translation[this.$i18n.locale].name : this.music.name
      return {
        title: title,
        titleTemplate: `%s - ${this.$t('page.music.title')} | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: title, hid: 'og:title', template: chunk => `${chunk} - ${this.$t('page.music.title')} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:image', content: `https://db.showbyrock.net/asset/musicjacket/musicjacket${String(this.music.id).padStart(8, '0')}.png`, hid: 'og:image' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' },
          { name: 'twitter:card', content: 'summary_large_image', hid: 'twitter:card' }
        ]
      }
    },
    async asyncData ({ params, $axios }) {
      let music = await $axios.$get(`/api/music/${params.id}`)
      if (!music.translation) music.translation = {ko: {}, en: {}, ja: {}}
      return {
        music: music
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb,
      ButtonRadioGroup,
      Modal
    },
    data() {
      return {
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
          90: this.$t('artist.special'),
          99: this.$t('artist.independent'),
        },
        difficultys: [
          { value: 0, label: 'EASY' },
          { value: 1, label: 'NORMAL' },
          { value: 2, label: 'HARD' },
          { value: 3, label: 'EXPERT' }
        ],
        difficulty: 3,
        editModal: false,
        model: {ko: {}, en: {}, ja: {}}
      }
    },
    computed: {
      artist() {
        return this.artistConst[this.music.artist_id]
      },
      total() {
        return this.music.info[this.difficulty].Rhythm + this.music.info[this.difficulty].Melody + this.music.info[this.difficulty].Harmony
      },
      musiclength() {
        let minutes = Math.floor(this.music.length / 60)
        let seconds = String(Math.floor(this.music.length - minutes * 60)).padStart(2, '0')
        
        return `${minutes}:${seconds}`
      }
    },
    methods: {
      async initModal() {
        this.model = JSON.parse(JSON.stringify(this.music.translation))
        this.editModal = true
      },
      async translateMusic() {
        let data = this.model
        await this.$axios.$put(`/api/edit/music/${this.music.id}`, { data })
        this.music.translation = JSON.parse(JSON.stringify(this.model))
        this.editModal = false
      }
    }
  };
</script>
<style>
</style>
