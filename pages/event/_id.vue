<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ event.translation[$i18n.locale].name ? event.translation[$i18n.locale].name : event.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`event`)">{{ $t('page.event.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ event.translation[$i18n.locale].name ? event.translation[$i18n.locale].name : event.name }}</li>
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
                <img v-lazy="`image/event/${event.id}`"
                     class="img-fluid">
              </div>
              <div class="col-lg-6 col-md-12 my-auto">
                <small class="display-4 font-weight-bolder" v-if="event.translation[$i18n.locale].category_name">{{ event.translation[$i18n.locale].category_name }}</small>
                <small class="display-4 font-weight-bolder" v-else>{{ event.category_name }}</small>
                <h1 class="display-3 mb-0" v-if="event.translation[$i18n.locale].name">
                  <small class="d-block text-sm font-weight-bolder" v-if="$store.state.showJP">{{ event.name }}</small>
                  {{event.translation[$i18n.locale].name}}
                </h1>
                <h1 class="display-3 mb-0" v-else>{{ event.name }}</h1>
                <hr class="my-3">
                <div class="row align-items-center">
                  <div class="col-4"><h1 class="display-4">{{ $t('event.start') }}</h1></div>
                  <div class="col-8"><h2 class="font-weight-normal">{{ toDateString(event.play_started_at) }}</h2></div>
                  <div class="col-4"><h1 class="display-4">{{ $t('event.end') }}</h1></div>
                  <div class="col-8"><h2 class="font-weight-normal">{{ toDateString(event.play_ended_at) }}</h2></div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center align-items-center mt-5" v-if="event.event_myumons.length">
              <div class="col-12 col-lg-auto mb-2 mb-lg-0">
                <h1 class="display-4 text-center text-lg">{{ $t('event.myumons') }}</h1>
              </div>
              <nuxt-link :to="localePath(`/bromide/${myumon.id}`)" v-for="myumon in event.event_myumons" :key="myumon.id">
                <div class="col-auto mb-4 mb-lg-0">
                  <img v-lazy="`image/thumbnail/${myumon.id}`"
                       style="width:90px; height:90px; object-fit:cover; object-position:top;">
                </div>
              </nuxt-link>
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
      <form @submit.prevent="translateEvent">
        <div class="form-row">
          <div class="col-12 mb-4">
            <base-input alternative type="text" :label="$t('edit.name')" formGroupClasses="mb-0" v-model="model[$i18n.locale].name"></base-input>
            <small class="text-muted">{{ event.name }}</small>
          </div>
          <div class="col-12 mb-4">
            <base-input alternative type="text" :label="$t('event.category_name')" formGroupClasses="mb-0" v-model="model[$i18n.locale].category_name"></base-input>
            <small class="text-muted">{{ event.category_name }}</small>
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
      let title = this.event.translation[this.$i18n.locale].name ? this.event.translation[this.$i18n.locale].name : this.event.name
      return {
        title: title,
        titleTemplate: `%s - ${this.$t('page.event.title')} | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: title, hid: 'og:title', template: chunk => `${chunk} - ${this.$t('page.event.title')} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:image', content: `https://db.showbyrock.net/asset/event/eventlogo${String(this.event.id).padStart(8, '0')}.png`, hid: 'og:image' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' },
          { name: 'twitter:card', content: 'summary_large_image', hid: 'twitter:card' }
        ]
      }
    },
    async asyncData ({ params, $axios }) {
      let event = await $axios.$get(`/api/event/${params.id}`)
      if (event.event_myumons.length) {
        for (let idx in event.event_myumons) {
          event.event_myumons[idx] = await $axios.$get(`/api/bromide/${event.event_myumons[idx].myumon_id}`)
        }
      }
      if (!event.translation) event.translation = {ko: {}, en: {}, ja: {}}
      return {
        event: event
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
      toDateString(date) {
        date = new Date(date)
        return date.toLocaleDateString(this.$i18n.locale, {year:'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
      },
      async initModal() {
        this.model = JSON.parse(JSON.stringify(this.event.translation))
        this.editModal = true
      },
      async translateEvent() {
        let data = this.model
        await this.$axios.$put(`/api/edit/event/${this.event.id}`, { data })
        this.event.translation = JSON.parse(JSON.stringify(this.model))
        this.editModal = false
      }
    }
  };
</script>
<style>
</style>
