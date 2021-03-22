<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-12">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.quiz.custom') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/quiz`)">{{ $t('page.quiz.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.quiz.custom') }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-12 col-lg-6 mx-auto mb-3">
          <base-input alternative :placeholder="$t('quiz.playLimit')" prepend-icon="fas fa-file-audio" v-model="model.playLimit" :label="$t('quiz.playLimit')"></base-input>
          <base-input alternative disabled :placeholder="$t('quiz.timeLimit')" prepend-icon="fas fa-stopwatch" v-model="model.timeLimit" :label="$t('quiz.timeLimit')"></base-input>
          <base-input alternative :placeholder="$t('quiz.quizAmount')" prepend-icon="fas fa-question-circle" v-model="model.quizAmount" :label="$t('quiz.quizAmount')"></base-input>
          <base-checkbox class="mb-3" v-model="model.showBand">{{ $t('quiz.showBand') }}</base-checkbox>
          <base-checkbox v-model="model.showTranslation">{{ $t('quiz.showTranslation') }}</base-checkbox>
        </div>
        <div class="col-12 text-center">
          <base-button outline type="default" @click="$router.push({ path: localePath(`/quiz/play`), query: model })">{{ $t('quiz.start') }}</base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  
  export default {
    head() {
      return {
        title: this.$t('page.quiz.custom'),
        titleTemplate: `%s | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.quiz.custom'), hid: 'og:title', template: chunk => `${chunk} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb
    },
    data() {
      return {
        model: {
          playLimit: 4,
          timeLimit: 60,
          quizAmount: 5,
          showBand: false,
          showTranslation: false
        }
      }
    }
  };
</script>
<style>
</style>