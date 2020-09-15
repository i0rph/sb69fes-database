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
        <div class="col-12 col-lg-3 mb-1">
          <spine-vue _id="2"></spine-vue>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import SpineVue from '@/components/spine';
  
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
      SpineVue
    }
  };
</script>
<style>
</style>