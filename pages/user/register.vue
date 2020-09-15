<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-12">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.account.register') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link to="/"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.account.register') }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row justify-content-center px-2 px-lg-0">
        <div class="col-12 col-lg-4 mb-1">
          <validation-observer v-slot="{handleSubmit}">
            <form @submit.prevent="handleSubmit(register)">
              <div class="form-row">
                <div class="col-12">
                  <base-input alternative type="email" prepend-icon="fas fa-envelope" :label="$t('account.email')" :name="$t('account.email')" rules="required|email" v-model="model.email"></base-input>
                </div>
                <div class="col-12">
                  <base-input alternative type="text" prepend-icon="fas fa-envelope" :label="$t('account.username')" :name="$t('account.username')" :rules="{ required: true, min: 5, max: 32 }" v-model="model.username"></base-input>
                </div>
                <div class="col-12">
                  <base-input alternative :type="passwordType" prepend-icon="fas fa-lock" :name="$t('account.password')" :label="$t('account.password')" :rules="{ required: true, regex: regex }" v-model="model.password" formGroupClasses="mb-0">
                    <i slot="append" class="fas fa-eye" @click="showPassword.password = !showPassword.password"></i>
                  </base-input>
                  <p class="mb-4"><small>{{ $t('account.passwordrule') }}</small></p>
                </div>
                <div class="col-12">
                  <base-input alternative :type="passwordConfirmType" prepend-icon="fas fa-lock" :name="$t('account.passwordConfirm')"
                              :label="$t('account.passwordConfirm')" :rules="{ required: true, confirmed: $t('account.password') }"
                              v-model="model.passwordConfirm">
                    <i slot="append" class="fas fa-eye" @click="showPassword.confirm = !showPassword.confirm"></i>
                  </base-input>
                </div>
                <div class="col-12 text-center text-lg-left">
                  <base-input :rules="{ required: { allowFalse: false } }" :name="$t('account.terms.title')">
                    <base-checkbox v-model="model.agree">
                      {{ $t('account.terms.description') }}
                    </base-checkbox>
                  </base-input>
                </div>
                <div class="col-12 text-center">
                  <base-button alternative type="primary" native-type="submit" class="w-100">{{ $t('account.register') }}</base-button>
                </div>
              </div>
            </form>
          </validation-observer>
          <div class="text-muted text-center my-3">
            <small>{{ $t('account.or') }}</small>
          </div>
          <div class="text-center">
            <a href="/auth/twitter">
              <base-button type="twitter" icon class="w-100 mb-3">
                <span class="btn-inner--icon"><i class="fab fa-twitter"></i></span>
                <span class="btn-inner--text">{{ $t('account.register_twitter') }}</span>
              </base-button>
            </a>
            <a href="/auth/google">
              <base-button type="google-plus" icon class="w-100">
                <span class="btn-inner--icon"><i class="fab fa-google"></i></span>
                <span class="btn-inner--text">{{ $t('account.register_google') }}</span>
              </base-button>
            </a>
          </div>
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
        title: this.$t('page.account.register'),
        titleTemplate: `%s | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.account.register'), hid: 'og:title', template: chunk => `${chunk} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' },
        ]
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb
    },
    data() {
      return {
        showPassword: {
          password: false,
          confirm: false
        },
        model: {
          email: '',
          password: '',
          passwordConfirm: '',
          username: '',
          agree: false
        },
        error: null,
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_\-])[A-Za-z\d$@$!%*?&_\-]{8,30}/
      }
    },
    computed: {
      passwordType() {
        return this.showPassword.password ? 'text' : 'password'
      },
      passwordConfirmType() {
        return this.showPassword.confirm ? 'text' : 'password'
      }
    },
    methods: {
      async register() {
        try {
          await this.$store.dispatch('register', {
            email: this.model.email,
            password: this.model.password,
            username: this.model.username,
            role: []
          }).then(() => {
            this.$router.push(this.localePath('/'))
          })
        } catch(err) {
          this.error = this.$t(`error.${err.name}`)
          console.log(err)
        }
      }
    }
  };
</script>
<style>
</style>