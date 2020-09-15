<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ comic.translation[$i18n.locale].name ? comic.translation[$i18n.locale].name : comic.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`comic`)">{{ $t('page.comic.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ comic.translation[$i18n.locale].name ? comic.translation[$i18n.locale].name : comic.name }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <card>
            <template slot="header">
              <h1 class="mb-0" v-if="comic.translation[$i18n.locale].name">
                <small class="d-block text-sm font-weight-bolder" v-if="$store.state.showJP">{{ comic.name }}</small>
                {{comic.translation[$i18n.locale].name}}
              </h1>
              <h1 class="mb-0" v-else>{{comic.name}}</h1>
            </template>
            <div class="row justify-content-center">
              <div class="col-auto">
                <img v-lazy="`image/comic/${comic.id}`"
                     class="img-fluid">
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
      <form @submit.prevent="translateComic">
        <div class="form-row">
          <div class="col-12 mb-4">
            <base-input alternative type="text" :label="$t('edit.name')" formGroupClasses="mb-0" v-model="model[$i18n.locale].name"></base-input>
            <small class="text-muted">{{ comic.name }}</small>
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
  import Modal from '@/components/argon-core/Modal.vue';
  
  export default {
    head() {
      let title = this.comic.translation[this.$i18n.locale].name ? this.comic.translation[this.$i18n.locale].name : this.comic.name
      return {
        title: title,
        titleTemplate: `%s - ${this.$t('page.comic.title')} | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: title, hid: 'og:title', template: chunk => `${chunk} - ${this.$t('page.comic.title')} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:image', content: `https://db.showbyrock.net/asset/event/eventlogo${String(this.comic.id).padStart(8, '0')}.png`, hid: 'og:image' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' },
          { name: 'twitter:card', content: 'summary_large_image', hid: 'twitter:card' }
        ]
      }
    },
    async asyncData ({ params, $axios }) {
      let comic = await $axios.$get(`/api/comic/${params.id}`)
      if (!comic.translation) comic.translation = {ko: {}, en: {}, ja: {}}
      return {
        comic: comic
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb,
      Modal
    },
    data() {
      return {
        editModal: false,
        model: {ko: {}, en: {}, ja: {}}
      }
    },
    methods: {
      async initModal() {
        this.model = JSON.parse(JSON.stringify(this.comic.translation))
        this.editModal = true
      },
      async translateComic() {
        let data = this.model
        await this.$axios.$put(`/api/edit/comic/${this.comic.id}`, { data })
        this.comic.translation = JSON.parse(JSON.stringify(this.model))
        this.editModal = false
      }
    }
  };
</script>
<style>
</style>
