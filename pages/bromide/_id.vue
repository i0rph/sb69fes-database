<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ myumon.translation[$i18n.locale].name ? myumon.translation[$i18n.locale].name : myumon.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`bromide`)">{{ $t('page.bromide.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ myumon.translation[$i18n.locale].name ? myumon.translation[$i18n.locale].name : myumon.name }}</li>
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
                <span class="badge-circle badge-lg border-0 bg-secondary text-sm" style="position: absolute; right: 4px; top: -8px; box-shadow: 0.1rem 0.1rem 0.2rem rgba(136, 152, 170, 0.875);" @click.prevent="$router.push(localePath(`/bromide/${myumon.shinka_myumon_id ? myumon.shinka_myumon_id : myumon.unshinka_myumon_id}`))">
                  <i class="fas fa-exchange-alt"></i>
                </span>
                <img v-lazy="`image/bromide/${myumon.id}`"
                     class="img-center img-fluid shadow shadow-lg--hover"
                     style="width: 600px;">
              </div>
              <div class="col-lg-6 col-md-12 my-auto">
                <h5 class="text-sm font-weight-bolder mb-0">{{ $store.state.rarityConst[myumon.rarity] }}</h5>
                <h1 class="display-3">
                  {{ character.label }}
                  <small class="text-sm font-weight-bolder">{{ artist }}</small>
                </h1>
                <h1 class="display-2 mb-0" v-if="myumon.translation[$i18n.locale].name">
                  <small class="d-block text-sm font-weight-bolder" v-if="$store.state.showJP">{{ myumon.name }}</small>
                  {{myumon.translation[$i18n.locale].name}}
                </h1>
                <h1 class="display-2 mb-0" v-else>{{myumon.name}}</h1>
                <hr class="my-3">
                <base-progress striped showLabel :label="$t('life')" :labelValue="stats.life" type="success" :value="(stats.life / 10)" :height="8"></base-progress>
                <base-progress striped showLabel :label="$t('rhythm')" :labelValue="stats.rhythm" type="rhythm" :value="(stats.rhythm / 100)" :height="8"></base-progress>
                <base-progress striped showLabel :label="$t('melody')" :labelValue="stats.melody" type="melody" :value="(stats.melody / 100)" :height="8"></base-progress>
                <base-progress striped showLabel :label="$t('harmony')" :labelValue="stats.harmony" type="harmony" :value="(stats.harmony / 100)" :height="8"></base-progress>
                <div class="row">
                  <div class="col-auto pr-0">
                    <button-checkbox v-model="likability" button-classes="btn-secondary"><i class="fas fa-heart ml-0"></i></button-checkbox>
                  </div>
                  <div class="col pl-2">
                    <button-radio-group :options="[{value: false, label: $t('bromide.default')}, {value: true, label: $t('bromide.max')}]" button-classes="btn-secondary w-50" v-model="max"></button-radio-group>
                  </div>
                </div>
              </div>
              <div class="col-12 my-2 pr-4" v-for="(skill, index) in myumon.skills" :key="skill.id">
                <skill-card
                  :skill="skill"
                  :level="skill.level"
                  :index="index"
                  @levelUpdate="updateLevel"></skill-card>
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
      <form @submit.prevent="translateMyumon">
        <div class="form-row">
          <div class="col-12 mb-4">
            <base-input alternative type="text" :label="$t('edit.name')" formGroupClasses="mb-0" v-model="model[$i18n.locale].name"></base-input>
            <small class="text-muted">{{ myumon.name }}</small>
          </div>
          <div class="col-12 mb-4">
            <base-input alternative type="text" :label="$t('edit.description')" formGroupClasses="mb-0" v-model="model[$i18n.locale].description"></base-input>
            <small class="text-muted">{{ myumon.description }}</small>
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
  import SkillCard from '@/components/feed/SkillCard';
  import ButtonRadioGroup from '@/components/argon-core/ButtonRadioGroup';
  import ButtonCheckbox from '@/components/argon-core/ButtonCheckbox';
  import Modal from '@/components/argon-core/Modal.vue';
  
  export default {
    head() {
      let title = this.myumon.translation[this.$i18n.locale].name ? this.myumon.translation[this.$i18n.locale].name : this.myumon.name
      return {
        title: title,
        titleTemplate: `%s - ${this.$t('page.bromide.title')} | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: title, hid: 'og:title', template: chunk => `${chunk} - ${this.$t('page.bromide.title')} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:image', content: `https://db.showbyrock.net/asset/bromide/charactercard${String(this.myumon.id).padStart(8, '0')}.png`, hid: 'og:image' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' },
          { name: 'twitter:card', content: 'summary_large_image', hid: 'twitter:card' }
        ]
      }
    },
    async asyncData ({ app, params, $axios }) {
      let myumon = await $axios.$get(`/api/bromide/${params.id}`)
      if (!myumon.translation) myumon.translation = {ko: {}, en: {}, ja: {}}
      for (let idx in myumon.skills) {
        if (!myumon.skills[idx].translation) {
          myumon.skills[idx].translation = {ko: {}, en: {}, ja: {}}
        }
        for (let skillIdx in myumon.skills[idx].skill) {
          if (!myumon.skills[idx].skill[skillIdx].translation) myumon.skills[idx].skill[skillIdx].translation = {ko: {}, en: {}, ja: {}}
          else if (myumon.skills[idx].skill[skillIdx].translation && !myumon.skills[idx].skill[skillIdx].translation[app.i18n.locale]) myumon.skills[idx].skill[skillIdx].translation[app.i18n.locale] = {}
        }
      }
      return {
        myumon: myumon
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb,
      SkillCard,
      ButtonRadioGroup,
      ButtonCheckbox,
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
          15: this.$t('artist.zerotickholic'),
          18: this.$t('artist.kuronoatmosphere'),
          90: this.$t('artist.special'),
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
          {id: 911, artist_id: 90, label: this.$t('character.shuu')},
        ],
        max: true,
        likability: true,
        editModal: false,
        model: {ko: {}, en: {}, ja: {}}
      }
    },
    computed: {
      character() {
        return this.characters.find(artistMyumon => artistMyumon.id === this.myumon.myumon_basic_id)
      },
      artist() {
        return this.artistConst[this.character.artist_id]
      },
      stats() {
        let life = this.myumon.life, rhythm = this.myumon.rhythm, melody = this.myumon.melody, harmony = this.myumon.harmony
        if (!this.max && this.myumon.rarity === 5) {
          life += this.myumon.ur_basic.life
          rhythm += this.myumon.ur_basic.rhythm
          melody += this.myumon.ur_basic.melody
          harmony += this.myumon.ur_basic.harmony
        }
        if (this.max) {
          life += this.myumon.max.life
          rhythm += + this.myumon.max.rhythm
          melody += this.myumon.max.melody
          harmony += this.myumon.max.harmony
        }
        
        life = Math.floor(life * (this.likability ? 1.05 : 1))
        rhythm = Math.floor(rhythm * (this.likability ? 1.05 : 1))
        melody = Math.floor(melody * (this.likability ? 1.05 : 1))
        harmony = Math.floor(harmony * (this.likability ? 1.05 : 1))
        
        return {life: life, rhythm: rhythm, melody: melody, harmony: harmony}
      }
    },
    methods: {
      updateLevel(level, index) {
        this.myumon.skills[index].level = level
      },
      typeLocalize(type) {
        if (type !== 3) return `${this.$t('bromide.skill.label')} ${type}`
        else return `${this.$t('bromide.skill.support')}`
      },
      async initModal() {
        this.model = JSON.parse(JSON.stringify(this.myumon.translation))
        this.editModal = true
      },
      async translateMyumon() {
        let data = this.model
        await this.$axios.$put(`/api/edit/myumon/${this.myumon.id}`, { data })
        this.myumon.translation = JSON.parse(JSON.stringify(this.model))
        this.editModal = false
      }
    }
  };
</script>
<style>
</style>
