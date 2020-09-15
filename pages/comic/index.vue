<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.comic.title') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.comic.title') }}</li>
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
        <div class="col-12 col-lg-4" v-for="comic in comicsFiltered" :key="comic.id">
          <nuxt-link :to="localePath(`/comic/${comic.id}`)">
            <card>
              <div class="row">
                <div class="col-12">
                  <img v-lazy="`image/comic/${comic.id}`"
                       class="img-fluid img-center mb-2">
                </div>
                <div class="col my-auto text-center">
                  <h3 class="d-inline-block mb-0" v-if="comic.translation && comic.translation[$i18n.locale] && comic.translation[$i18n.locale].name">
                    <small class="d-block font-weight-bolder text-center" v-if="$store.state.showJP">{{ comic.name }}</small>
                    {{ comic.translation && event.translation[$i18n.locale].name }}
                  </h3>
                  <h3 class="d-inline-block mb-0" v-else>{{comic.name}}</h3>
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
        title: this.$t('page.comic.title'),
        titleTemplate: `%s | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.comic.title'), hid: 'og:title', template: chunk => `${chunk} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    asyncData ({ $axios }) {
      return $axios.$get(`/api/comic`)
        .then(data => {
          return {
            comics: data
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
      compareComics(a,b) {
        if (a.id < b.id) return -1 * this.$store.state.comicFilter.sortOrder
        else if (a.id > b.id) return 1 * this.$store.state.comicFilter.sortOrder
        return 0
      },
      checktr(obj, params) {
        return obj.translation ? obj.translation[this.$i18n.locale] ? obj.translation[this.$i18n.locale][params] ? obj.translation[this.$i18n.locale][params].toLowerCase().includes(this.keyword.toLowerCase()) : false : false : false
      }
    },
    computed: {
      comicsFiltered() {
        let comics = this.comics.sort((a,b) => {
          return this.compareComics(a,b)
        })
        
        return comics.filter(comic => {
          return (comic.name.toLowerCase().includes(this.keyword.toLowerCase()) || this.checktr(comic, 'name'))
        })
      },
      ...mapFields([
        'comicFilter.sortOrder'
      ])
    }
  };
</script>
<style>
</style>
