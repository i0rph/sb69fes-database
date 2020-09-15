// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import '@/polyfills';
// Notifications plugin. Used on Notifications page
import Notifications from '~/components/argon-core/NotificationPlugin';
// Validation plugin used to validate forms
import VeeValidate from 'vee-validate';
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from '~/components/argon-core/SidebarPlugin';
import Vue from 'vue';
import ElementLocale from 'element-ui/lib/locale'
import './globalDirectives'
import './globalComponents'
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { configure } from 'vee-validate';
import VueLazyload from "vue-lazyload";
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js';

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
  });
});

Vue.use(SideBar);
Vue.use(Notifications);
export default function ({ app }) {
  configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
      dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    },
    defaultMessage: (field, values) => {
      values._field_ = app.i18n.t(`${field}`);
      return app.i18n.t(`validation.${values._rule_}`, values);
    }
  });
  ElementLocale.i18n((key, value) => app.i18n.t(key, value))
}
Vue.use(VueLazyload, {
  loading: '/loading.svg',
  error: '/error.png',
  lazyComponent: true
});
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
});