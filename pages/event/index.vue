<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.event.title') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.event.title') }}</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-3 col-5 pl-0 mr-1">
          <base-input-light alternative formGroupClasses="my-0" v-model="keyword">
            <template slot="append">
              <el-popover placement="bottom-end" width="405">
                <div class="row px-2 pb-2 mx-auto">
                  <label class="col-12 col-form-label form-control-label">{{ $t('sort.label') }}</label>
                  <div class="col">
                    <base-radio class="mx-1 d-inline-block mb-1" name="1" v-model="sortOrder"><span>{{ $t('sort.ascending') }}</span></base-radio>
                    <base-radio class="mx-1 d-inline-block mb-1" name="-1" v-model="sortOrder"><span>{{ $t('sort.descending') }}</span></base-radio>
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
        <div class="col-12 col-lg-6" v-for="event in eventsFiltered" :key="event.id">
          <nuxt-link :to="localePath(`/event/${event.id}`)">
            <card>
              <div class="row">
                <div class="col-12">
                  <img v-lazy="`image/event/${event.id}`"
                       class="img-fluid img-center mb-2">
                </div>
                <div class="col my-auto text-center">
                  <h5 class="mb-0" v-if="event.translation && event.translation[$i18n.locale] && event.translation[$i18n.locale].category_name">{{ event.translation[$i18n.locale].category_name }}</h5>
                  <h5 class="mb-0" v-else>{{event.category_name}}</h5>
                  <h3 class="d-inline-block mb-0" v-if="event.translation && event.translation[$i18n.locale] && event.translation[$i18n.locale].name">
                    <small class="d-block font-weight-bolder text-center" v-if="$store.state.showJP">{{ event.name }}</small>
                    {{ event.translation && event.translation[$i18n.locale].name }}
                  </h3>
                  <h3 class="d-inline-block mb-0" v-else>{{event.name}}</h3>
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
  
  export default {
    head() {
      return {
        title: this.$t('page.event.title'),
        titleTemplate: `%s | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.event.title'), hid: 'og:title', template: chunk => `${chunk} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    asyncData ({ $axios }) {
      return $axios.$get(`/api/event`)
        .then(data => {
          return {
            events: data
          }
        })
        .catch(err => {
          //$sentry.captureException(err)
        })
    },
    components: {
      BaseHeader,
      RouteBreadCrumb
    },
    data() {
      return {
        keyword: ''
      }
    },
    mounted() {
      //
    },
    methods: {
      compareEvents(a,b) {
        if (a.id < b.id) return -1 * this.$store.state.eventFilter.sortOrder
        else if (a.id > b.id) return 1 * this.$store.state.eventFilter.sortOrder
        return 0
      },
      checktr(obj, params) {
        return obj.translation ? obj.translation[this.$i18n.locale] ? obj.translation[this.$i18n.locale][params] ? obj.translation[this.$i18n.locale][params].toLowerCase().includes(this.keyword.toLowerCase()) : false : false : false
      }
    },
    computed: {
      eventsFiltered() {
        let events = this.events.sort((a,b) => {
          return this.compareEvents(a,b)
        })
        
        return events.filter(event => {
          return (event.name.toLowerCase().includes(this.keyword.toLowerCase()) || this.checktr(comic, 'name'))
        })
      },
      ...mapFields([
        'eventFilter.sortOrder'
      ])
    }
  };
</script>
<style>
</style>
