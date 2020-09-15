<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar logo="/img/logo.png">
      <template slot-scope="props" slot="links">

        <sidebar-item :link="{ name: $t('page.home'), icon: 'fas fa-home text-blue', path: localePath('/') }"></sidebar-item>
        
        <sidebar-item :link="{ name: $t('page.bromide.title'), icon: 'fas fa-camera-retro text-info' }">
          <sidebar-item :link="{ name: $t('page.bromide.home'), path: localePath('bromide') }"></sidebar-item>
          <sidebar-item :link="{ name: $t('page.bromide.table'), path: localePath('/bromide/table') }"></sidebar-item>
        </sidebar-item>
        
        <sidebar-item :link="{ name: $t('page.music.title'), icon: 'fas fa-music text-pink', path: localePath('music') }"></sidebar-item>
        
        <sidebar-item :link="{ name: $t('page.event.title'), icon: 'fas fa-calendar-alt text-green', path: localePath('event') }"></sidebar-item>
        
        <sidebar-item :link="{ name: $t('page.comic.title'), icon: 'fas fa-book text-orange', path: localePath('comic') }"></sidebar-item>
        
      </template>

      <template slot="links-after">
        <hr class="my-3">

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a class="nav-link" href="https://discord.gg/9CprSUz" target="_blank">
              <i class="fab fa-discord"></i>
              <span class="nav-link-text">{{ $t('sidebar.discord') }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://twitter.com/sb69_database" target="_blank">
              <i class="fab fa-twitter"></i>
              <span class="nav-link-text">{{ $t('sidebar.twitter') }}</span>
            </a>
          </li>
        </ul>
      </template>
      
      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">{{ $t('sidebar.version.title') }}</h6>

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <span class="nav-link">
              <i class="fas fa-database"></i>
              <el-tooltip :content="$t('sidebar.version.database')" placement="bottom-start" :visible-arrow="false">
                <span class="nav-link-text">{{ databaseDate }}</span>
              </el-tooltip>
            </span>
          </li>
          <li class="nav-item" v-if="appVersion">
            <span class="nav-link">
              <i class="fab fa-google-play"></i>
              <el-tooltip :content="$t('sidebar.version.app')" placement="bottom-start" :visible-arrow="false">
                <span class="nav-link-text">{{ appVersion }}</span>
              </el-tooltip>
            </span>
          </li>
        </ul>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.name === 'alternative' ? 'light': 'default'"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue';
  import ContentFooter from '~/components/layouts/argon/ContentFooter.vue';
  import DashboardContent from '~/components/layouts/argon/Content.vue';
  import BackToTop from 'vanilla-back-to-top'

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('scrollbar-inner');
        }
      }
    },
    mounted() {
      this.initScrollbar()
      BackToTop.addBackToTop({
        backgroundColor: 'white',
        scrollDuration: 1000,
        showWhenScrollTopIs: 300,
        textColor: '#172b4d'
      })
      this.$axios.$get(`/api/sidebar`)
        .then(data => {
          this.appVersion = data.app_version
          this.lastUpdate = data.last_update
        })
    },
    data() {
      return {
        lastUpdate: null,
        appVersion: null
      }
    },
    computed: {
      databaseDate() {
        let date = new Date(this.lastUpdate)
        return date.toLocaleDateString(this.$i18n.locale, {year:'numeric', month: 'long', day: 'numeric'})
      }
    }
  };
</script>
<style lang="scss">
#back-to-top {
  background: white !important;
  color: #172b4d !important;
}
.sentry-error-embed-wrapper {
  z-index: 9999 !important;
}
</style>
