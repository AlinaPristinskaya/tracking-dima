import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import style from '@/assets/css/style.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VuePlugin from '@/plugin/VuePlugin';
import conection from "@/plugin/modules/conection";

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAuhH6tu0nZqH419pzeccGhdxlr4wevY1k ',
      libraries: 'places',
    },
  }
);
Vue.use(ElementUI);
Vue.use(VuePlugin);
Vue.config.productionTip = false

new Vue({
  router,
  style,
  render: h => h(App),
  mounted () {
    conection.created();
  }
}).$mount('#app')
