import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    trackingInfo: {
      Code: "073e43d5a81a0dd7ae0eda456a4c793f",
      latitude: "50.43042",
      longitude: "30.45587",
      clientlatitude: "50.46694",
      clientlongitude: "30.46619",
      EstimateTime: "2016-04-27 15:11:15",
      CarName: "353173064429820",
      ClientName: "ФОП Бондарчук Оксана Михайлівн",
      Address: "смт. Немішаєве вул. заводская, буд. 50, корп.  а"}
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
          if(trackingInfo && trackingInfo.length > 0) {
            commit('GET_TRACKING_INFO', trackingInfo && trackingInfo.length > 0 ? trackingInfo[0] : {});
          }
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
