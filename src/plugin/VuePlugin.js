import conection from './modules/conection';
import dataProcessing, { storage, shadow } from './modules/dataProcessing';
import localeStorageBuffer from './modules/localeStorageBuffer';
// import router from './modules/router';

const VuePlugin = {
  install(Vue) {
    Vue.prototype.$GetStorageAll = (() => storage);
    Vue.prototype.$GetStorage = ((key) => storage[key]);

    Vue.prototype.$ChangePage = ((_pageName) => {
      let pageName = _pageName;
      if (pageName === 'PREV_PAGE') {
        // pageName = router.back();
        if (pageName === false) return;
      } else {
        // router.set(storage.currentPage);
      }
      shadow.page = shadow.pages[pageName];
      storage.currentPage = pageName;
    });

    Vue.prototype.$TogglePreloader = conection.getPreloaderCallBack.bind(conection);
    Vue.prototype.$send = conection.webSoketSendMessage.bind(conection);

    dataProcessing.$observe = Vue.observable;
    Vue.prototype.$storage = storage;
    Vue.prototype.$localStorage = localeStorageBuffer;

    Vue.prototype.$ComponentUpdate = dataProcessing.getComponentUpdateCallBack.bind(dataProcessing);
  },
};

export default VuePlugin;
