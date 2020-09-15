<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ gacha.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`gacha`)">{{ $t('page.gacha.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ gacha.name }}</li>
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
                <img v-lazy="`image/gacha/${gacha.id}`"
                     class="img-fluid img-center">
              </div>
              <div class="col-lg-6 col-md-12 my-auto">
                <h1 class="display-3 mb-0">{{ gacha.name }}</h1>
                <hr class="my-3">
                <div class="row align-items-center">
                  <div class="col-4"><h1 class="display-4">{{ $t('gacha.start') }}</h1></div>
                  <div class="col-8"><h2 class="font-weight-normal">{{ toDateString(gacha.started_at) }}</h2></div>
                  <div class="col-4"><h1 class="display-4">{{ $t('gacha.end') }}</h1></div>
                  <div class="col-8"><h2 class="font-weight-normal">{{ toDateString(gacha.ended_at) }}</h2></div>
                </div>
              </div>
            </div>
            <dl class="row px-lg-9 mt-3">
              <dt class="col-12 col-lg-3">
                <h1>{{ $t('gacha.caution') }}</h1>
              </dt>
              <dd class="col-auto">
                <p v-html="gacha.caution.replace(/(?:\r\n|\r|\n)/g, '<br/>')" class="font-weight-normal"></p>
              </dd>
              <div class="col-12"></div>
              <dt class="col-12 col-lg-3">
                <h1>{{ $t('gacha.description') }}</h1>
              </dt>
              <dd class="col-auto">
                <p v-html="gacha.description.replace(/(?:\r\n|\r|\n)/g, '<br/>')" class="font-weight-normal"></p>
              </dd>
            </dl>
          </card>
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
        title: this.gacha.name,
        titleTemplate: `%s - ${this.$t('page.gacha.title')} | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.gacha.name, hid: 'og:title', template: chunk => `${chunk} - ${this.$t('page.gacha.title')} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:image', content: `https://db.showbyrock.net/asset/gacha/gachalogo${String(this.gacha.id).padStart(8, '0')}.png`, hid: 'og:image' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' },
          { name: 'twitter:card', content: 'summary_large_image', hid: 'twitter:card' }
        ]
      }
    },
    async asyncData ({ params, $axios }) {
      let gacha = await $axios.$get(`/api/gacha/${params.id}`)
      return {
        gacha: gacha
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb
    },
    methods: {
      toDateString(date) {
        date = new Date(date)
        return date.toLocaleDateString(this.$i18n.locale, {year:'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
      }
    }
  };
</script>
<style>
</style>
