<template>
  <div>
    <div class="header py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col px-5">
              <h1 class="mb-1">{{ $t('error.title') }}</h1>
              <p class="text-lead font-weight-bold">{{ $t('error.description') }}<br/><small>{{ error.message }}</small></p>
              <nuxt-link to="/" class="font-weight-bold mt-5">{{ $t('error.return') }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>