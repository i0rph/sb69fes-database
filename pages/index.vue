<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-12">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.home') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item active" aria-current="page"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-12 col-lg-3 mb-1" v-if="event">
          <event-card :event="event"></event-card>
        </div>
        <div class="col-12 col-lg-3">
          <Timeline id="sb69f" sourceType="profile" :options="{lang: $i18n.locale, height: 400}"
            error-message="" error-message-class="text-center"
            widget-class="bg-white">
            <div class="text-center"><img src="/loading.svg"></div>
          </Timeline>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import { Timeline } from 'vue-tweet-embed';
  import EventCard from '@/components/feed/EventCard';
  
  export default {
    head() {
      return {
        title: this.$t('siteName'),
        meta: [
          { name: 'og:title', content: this.$t('siteName'), hid: 'og:title' },
          { name: 'og:url', content: `https://bushiroad.seiyuus.com${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb,
      Timeline,
      EventCard
    },
    data() {
      return {
        event: null
      }
    },
    mounted() {
      this.$axios.$get('/api/home')
        .then(event => {
          this.event = event
        })
    }
  };
</script>
<style>
</style>