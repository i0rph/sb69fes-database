<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
  >
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div class="pr-3 sidenav-toggler"
             :class="{active: $sidebar.showSidebar}"
             @click="toggleSidebar">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav align-items-center ml-auto">
      <el-popover placement="bottom" trigger="hover" popper-class="lang-popper" width="100">
        <div class="row">
          <template v-if="$store.state.authUser">
            <div class="col-12 my-2">
              <nuxt-link :to="localePath('/user/setting')" class="d-block text-reset text-center">
                {{ $t('account.setting') }}
              </nuxt-link>
            </div>
            <div class="col-12 my-2">
              <div @click="signout()" class="d-block text-reset text-center">
                {{ $t('account.logout') }}
              </div>
            </div>
          </template>
          <template v-else>
            <div class="col-12 my-2">
              <nuxt-link :to="{path:localePath('/user/login'), query:{redirect:$route.path}}" class="d-block text-reset text-center">
                {{ $t('account.login') }}
              </nuxt-link>
            </div>
            <div class="col-12 my-2">
              <nuxt-link :to="{path:localePath('/user/register'), query:{redirect:$route.path}}" class="d-block text-reset text-center">
                {{ $t('account.register') }}
              </nuxt-link>
            </div>
          </template>
        </div>
        <i class="fas fa-user" slot="reference"></i>
      </el-popover>
    </ul>
    <ul class="align-items-center ml-4 mr-2 mr-lg-0 navbar-nav">
      <el-popover placement="bottom" trigger="hover" popper-class="lang-popper" width="100">
        <div class="row">
          <div class="col-12 my-2" v-for="locale in $i18n.locales" v-if="locale.code !== $i18n.locale" :key="locale.code">
            <nuxt-link :to="switchLocalePath(locale.code)" class="d-block text-reset text-center">
              {{ locale.name }}
            </nuxt-link>
          </div>
        </div>
        <i class="fas fa-language" slot="reference"></i>
      </el-popover>
    </ul>
    <ul class="align-items-center ml-4 mr-2 mr-lg-0 navbar-nav">
      <el-popover placement="bottom" trigger="hover">
        <div class="row mx-auto">
          <label class="col-12 col-form-label form-control-label">{{ $t('option.showJP') }}</label>
          <div class="col mb-2">
            <base-radio class="mx-1 d-inline-block mb-1" :name="true" v-model="showJP"><span>{{ $t('option.yes') }}</span></base-radio>
            <base-radio class="mx-1 d-inline-block mb-1" :name="false" v-model="showJP"><span>{{ $t('option.no') }}</span></base-radio>
          </div>
        </div>
        <i class="fas fa-cog" slot="reference"></i>
      </el-popover>
    </ul>
  </base-nav>
</template>
<script>
  import BaseNav from '@/components/argon-core/Navbar/BaseNav.vue';
  import { mapFields } from 'vuex-map-fields';

  export default {
    components: {
      BaseNav
    },
    props: {
      type: {
        type: String,
        default: 'light', // default|light
        description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
      }
    },
    data() {
      return {
        showMenu: false,
        showSetting: false
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      async signout() {
        try {
          await this.$store.dispatch('signout')
        } catch(err) {
          console.log(err)
        }
      }
    },
    computed: {
      ...mapFields([
        'showJP'
      ])
    }
  };
</script>
<style>
  .lang-popper {
    min-width: 100px !important;
  }
</style>