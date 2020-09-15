<template>
  <div>
    <div class="media media-comment">
      <img alt="Image placeholder" class="avatar avatar-lg media-comment-avatar" :src="`/asset/skillicons/skillicon${String(skill.myumon_skill_effect_id).padStart(8, '0')}.png`">
      <div class="media-body">
        <div class="media-comment-text row">
          <div class="col">
            <h5 class="text-muted mb-0">{{typeLocalize}}</h5>
            <h5 class="display-4 mt-0" v-if="skill.translation[$i18n.locale].name">{{skill.translation[$i18n.locale].name}}</h5>
            <h5 class="display-4 mt-0" v-else>{{skill.name}}</h5>
            <h5 class="text-sm lh-160 font-weight-bolder" v-if="skill.skill[level-1].translation[$i18n.locale].digest">{{skill.skill[level-1].translation[$i18n.locale].digest}}</h5>
            <h5 class="text-sm lh-160 font-weight-bolder" v-else>{{skill.skill[level-1].digest}}</h5>
          </div>
          <div class="col-auto my-auto">
            <span class="font-weight-bolder">Lv.{{ level }}</span>
            <base-button type="secondary d-block my-1 mx-auto" size="sm" @click="increment"><i class="fas fa-caret-up"></i></base-button>
            <base-button type="secondary d-block mx-auto" size="sm" @click="decrement"><i class="fas fa-caret-down"></i></base-button>
          </div>
          <div class="col-12">
            <hr class="my-3">
            <p class="text-sm lh-160 font-weight-bolder" v-html="skill.skill[level-1].translation[$i18n.locale].description" v-if="skill.skill[level-1].translation[$i18n.locale].description"></p>
            <p class="text-sm lh-160 font-weight-bolder" v-html="skill.skill[level-1].description" v-else></p>
          </div>
        </div>
      </div>
    </div>
    <span class="badge-circle badge-md bg-secondary border-0 text-reset"
          style="position: absolute;right: 0px;top: 20px;box-shadow: rgba(136, 152, 170, 0.875) 0.1rem 0.1rem 0.2rem;"
          @click="initModal" v-if="$store.state.authUser && $store.state.authUser.role.includes('translator')">
      <i class="fas fa-edit"></i>
    </span>
    
    <modal :show.sync="editModal" headerClasses="py-3" bodyClasses="pt-3">
      <template slot="header"><h3 class="mb-0">{{ $t('edit.title') }}</h3></template>
      <form @submit.prevent="translateSkill">
        <div class="form-row">
          <div class="col-12">
            <base-input alternative type="text" :label="$t('edit.name')" formGroupClasses="mb-0" v-model="model.translation[$i18n.locale].name"></base-input>
            <small class="text-muted">{{ skill.name }}</small>
          </div>
          <template v-for="(item, idx) in skill.skill">
            <div class="col-12 mb-3">
              <hr class="my-4">
              <base-input alternative type="text" :label="`${$t('bromide.skill.label')} ${$t('skill.digest')} Lv.${idx+1}`" formGroupClasses="mb-0" v-model="model.skill[idx].translation[$i18n.locale].digest"></base-input>
              <small class="text-muted">{{ skill.skill[idx].digest }}</small>
            </div>
            <div class="col-12">
              <base-input alternative type="text" :label="`${$t('bromide.skill.label')} ${$t('skill.description')} Lv.${idx+1}`" formGroupClasses="mb-0" v-model="model.skill[idx].translation[$i18n.locale].description"></base-input>
              <small class="text-muted">{{ skill.skill[idx].description }}</small>
            </div>
          </template>
          <div class="col-12 mt-4 text-center">
            <base-button alternative type="primary" native-type="submit" class="w-100">{{ $t('edit.submit') }}</base-button>
          </div>
        </div>
      </form>
    </modal>
  </div>
</template>
<script>
  import Modal from '@/components/argon-core/Modal.vue';
  
  export default {
    name: 'skill-card',
    components: {
      Modal
    },
    props: {
      skill: {
        type: Object
      },
      level: {
        type: Number,
        default: 'Skill Level'
      },
      index: Number
    },
    data() {
      return {
        editModal: false,
        model: {ko: {}, en: {}, ja: {}}
      }
    },
    computed: {
      typeLocalize() {
        if (this.skill.type !== 3) return `${this.$t('bromide.skill.label')} ${this.skill.type}`
        else return `${this.$t('bromide.skill.support')}`
      }
    },
    created() {
      this.model = JSON.parse(JSON.stringify(this.skill))
    },
    methods: {
      increment() {
        if (this.level < 10) this.$emit('levelUpdate', this.level + 1, this.index)
        
      },
      decrement() {
        if (this.level > 1) this.$emit('levelUpdate', this.level - 1, this.index)
      },
      async initModal() {
        this.model = JSON.parse(JSON.stringify(this.skill))
        this.editModal = true
      },
      async translateSkill() {
        let data = this.model
        await this.$axios.$put('/api/edit/skill', { data })
        this.skill = JSON.parse(JSON.stringify(this.model))
        this.editModal = false
      }
    }
  }
</script>
<style>
</style>
