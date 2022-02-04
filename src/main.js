import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuex from 'vuex'
import store from './store';
import settings from '@/../public/settings.js';
import i18n from './i18n'



Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAuhH6tu0nZqH419pzeccGhdxlr4wevY1k',
      libraries: 'places',
      region: 'UA',
      language: 'uk',
    },
  }
);
Vue.use(Vuex)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  settings,
  router,
  store,
  i18n,
  render: h => h(App),
  mounted () {
  }
}).$mount('#app')
