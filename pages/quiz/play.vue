<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-12">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.quiz.play') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/quiz`)">{{ $t('page.quiz.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.quiz.play') }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row" v-if="!end">
        <div class="col-12">
          <vue-plyr :options="{controls: []}" ref="plyr">
            <audio :src="`asset/music/music${String(answer.id).padStart(8, '0')}.mp3`"></audio>
          </vue-plyr>
        </div>
        <div class="col-12 mb-1"><h3>{{ `${stage}/${quizAmount}` }}</h3></div>
        <div class="col-12 mb-1" v-for="music in quizArr" :key="music.id">
          <base-button outline type="default" class="w-100" @click="onSelect(music)"><ruby>{{ music.name }}<rt v-if="showTranslation === 'true'">{{ music.translation ? music.translation[$i18n.locale].name : music.name }}</rt></ruby>{{ showBand === 'true' ? `&nbsp- ${artistConst[music.artist_id]}` : '' }}</base-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12 mb-3" v-for="r in result">
          <div class="row  mx-auto">
            <div class="col-auto text-center">
              <img :src="`image/musicjacket/${r.music.jacket_image_id}`" class="img-fluid w-50">
            </div>
            <div class="col-auto my-auto">
              <h1><i :class="r.result ? ['fas fa-check-circle', 'text-success'] : ['fas fa-times-circle', 'text-danger']"></i> {{r.music.name}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <modal :show.sync="modal" headerClasses="py-3" bodyClasses="pt-3" :showClose="false" @close="next">
      <template slot="header">
        <h1>{{ status ? $t('quiz.correct') : $t('quiz.wrong') }}</h1>
      </template>
      <div class="row">
        <div class="col-6">
          <img :src="`image/musicjacket/${answer.jacket_image_id}`" class="img-fluid">
        </div>
        <div class="col my-auto">
          <label class="form-control-label">{{ $t('quiz.title') }}</label>
          <h4 class="mb-4">{{ answer.name }}</h4>
          <label class="form-control-label">{{ $t('quiz.band') }}</label>
          <h4>{{ artist }}</h4>
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="next">{{ $t('quiz.next') }}</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
  function getRandom(arr, n) {
    var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import Modal from '@/components/argon-core/Modal.vue';
  
  export default {
    head() {
      return {
        title: this.$t('page.quiz.play'),
        titleTemplate: `%s | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.quiz.play'), hid: 'og:title', template: chunk => `${chunk} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    async asyncData ({ params, $axios }) {
      let musics = await $axios.$get(`/api/music`)
      let quizArr = getRandom(musics, 5)
      let answer = getRandom(quizArr, 1)[0]
      return {
        musics: musics,
        quizArr: quizArr,
        answer: answer
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb,
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
        selected: null,
        status: null,
        modal: false,
        stage: 1,
        playLimit: this.$route.query.playLimit || 4,
        timeLimit: this.$route.query.timeLimit || 60,
        quizAmount: this.$route.query.quizAmount || 5,
        showBand: this.$route.query.showBand || false,
        showTranslation: this.$route.query.showTranslation || false,
        score: 0,
        result: [],
        end: false
      }
    },
    methods: {
      onSelect(obj) {
        obj.id === this.answer.id ? this.status = true : this.status = false
        if (this.status) this.score++
        this.modal = true
      },
      next() {
        this.result.push({music:this.answer, result: this.status})
        
        if (this.stage === parseInt(this.quizAmount)) {
          this.modal = false
          this.end = true
          return
        }
        
        this.stage++
        
        this.musics.splice(this.musics.indexOf(this.answer), 1)
        this.quizArr = getRandom(this.musics, 5)
        this.answer = getRandom(this.quizArr, 1)[0]
        
        this.modal = false
        this.player.source = {
          type: 'audio',
          sources: [
            {
              src: `asset/music/music${String(this.answer.id).padStart(8, '0')}.mp3`,
              type: 'audio/mp3',
            }
          ]
        }
        this.player.play()
        this.player.on('timeupdate', () => {
          if (this.player.currentTime > this.playLimit) this.player.stop()
        })
      }
    },
    computed: {
      player () {
        return this.$refs.plyr.player
      },
      artist() {
        return this.artistConst[this.answer.artist_id]
      },
    },
    mounted() {
      this.player.on('ready', () => {
        this.player.play()
        this.player.on('timeupdate', () => {
          if (this.player.currentTime > this.playLimit) this.player.stop()
        })
      })
    }
  };
</script>
<style>
</style>