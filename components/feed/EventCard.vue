<template>
  <nuxt-link :to="localePath(`/event/${event.id}`)">
    <card class="text-center">
      <img :src="`asset/event/eventlogo${String(event.id).padStart(8, '0')}.png`" class="img-fluid mb-1">
      <h4 class="mb-0" v-if="event.translation && event.translation[$i18n.locale] && event.translation[$i18n.locale].category_name">
        {{event.translation[$i18n.locale].category_name}}
      </h4>
      <h4 class="mb-0" v-else>{{event.category_name}}</h4>
      <h2 v-if="event.translation && event.translation[$i18n.locale] && event.translation[$i18n.locale].name">
        {{event.translation[$i18n.locale].name}}
      </h2>
      <h2 v-else>{{event.name}}</h2>
      <h4>{{ countString }}</h4>
    </card>
  </nuxt-link>
</template>
<script>
  let interval = null

  export default {
    name: 'event-card',
    props: {
      event: {
        type: Object
      }
    },
    data() {
      return {
        now: Math.trunc(new Date().getTime() / 1000),
        diff: 0
      }
    },
    computed: {
      seconds() {
        return Math.trunc(this.diff) % 60
      },
      minutes() {
        return Math.trunc(this.diff / 60) % 60
      },
      hours() {
        return Math.trunc(this.diff / 60 / 60) % 24
      },
      days() {
        return Math.trunc(this.diff / 60 / 60 / 24)
      },
      countString() {
        let day = this.days + `${this.$i18n.locale === 'en' ? ' ' : ''}` + this.$t('event.day') + `${this.$i18n.locale === 'en' && this.days > 1 ? 's' : ''}`
        let hour = this.hours + `${this.$i18n.locale === 'en' ? ' ' : ''}` + this.$t('event.hour') + `${this.$i18n.locale === 'en' && this.hours > 1 ? 's' : ''}`
        let minute = this.minutes + `${this.$i18n.locale === 'en' ? ' ' : ''}` + this.$t('event.minute') + `${this.$i18n.locale === 'en' && this.minutes > 1 ? 's' : ''}`
        let second = this.seconds + `${this.$i18n.locale === 'en' ? ' ' : ''}` + this.$t('event.second') + `${this.$i18n.locale === 'en' && this.seconds > 1 ? 's' : ''}`
        return `${day} ${hour} ${minute} ${second} ${this.$t('event.left')}`
      }
    },
    created() {
      interval = setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000)
      }, 1000)
    },
    watch: {
      now(value) {
        this.diff = Math.trunc(Date.parse(this.event.play_ended_at) / 1000) - this.now
        if(this.diff <= 0) {
          this.diff = 0
          clearInterval(interval)
        }
      }
    },
    destroyed() {
      clearInterval(interval)
    }
  }
</script>
<style>
</style>
