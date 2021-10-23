import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    trackingInfo: {}
  },
  mutations: {
    GET_TRACKING_INFO(state, trackingInfo) {
      /* eslint-disable */
      state.trackingInfo = trackingInfo;
      /* eslint-enable */
    },
  },
  actions: {
    async getTracking({commit}, hash) {
      await axios
        .get(`https://s5.vvtrack.com/f.tracking/loadData.php?hash=${hash}`)
        .then(response => {
          const trackingInfo = response.data;
          commit('GET_TRACKING_INFO', trackingInfo && trackingInfo.length > 0 ? trackingInfo[0] : {});
        })
        .catch(e => console.log('Error: ', e))
    }
  },
  getters: {
    trackingInfo(state) {
      return state.trackingInfo;
    },
  },
  modules: {
  },
});
