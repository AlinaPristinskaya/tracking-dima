import $alertMessage from './alertMessage';
// import $playSound from './playSound';
import $localStorage from './localeStorageBuffer';
// import $router from './router';

const shadow = {
  templates: [],
  currentPage: '',
  page: {
    items: {},
  },
  pages: {},
};

const storage = {
  templates: [],
  get currentPage() {
    return shadow.currentPage;
  },
  set currentPage(v) {
    shadow.currentPage = v;
  },
  get page() {
    return shadow.page;
  },
  set page(v) {
    shadow.page = v;
  },

  isShowPreloader: true,
  session_id: $localStorage.get('session_id'),
};

export default {
  getComponentUpdateCallBack(callBack) {
    this.componentUpdateCallBack = callBack;
  },

  $observe: null,

  dataProcessing(data) {
    const parsedData = JSON.parse(data);

    // if (parsedData === false) { // ping вернул false - необходимо авторизоваться
    //   if ($router.get())
    //     window.location.reload();
    // }

    if (parsedData['set-page']) {
      parsedData['set-page'].forEach((template) => {
        const key = template.name;
        shadow.pages[key] = template;

        if (!template.sortItemsFromServer) {
          const items = {
            control: {},
            bigTable: {},
            info: '',
            title: '',
            'title-danger': '',
            login: '',
            number: '',
            field: [],
            textareaField: [],
            signature: {},
            QRCodeReader: {},
            BarcodeReader: {},
            'date-picker': [],
            rack: {},
            defectBtn: {},
            checkbox: [],
            list: {},
            table: [],
            table_array: [],
            'btn-menu': [],
            comboboxActive: {},
            btn: [],
            modal: {},
          };

          Object.keys(items).forEach((k) => {
            if (shadow.pages[key].items[k] || k === 'number') {
              items[k] = shadow.pages[key].items[k];
            } else {
              delete items[k];
            }
          });
          shadow.pages[key].items = items;
        }
      });
    }
    if (parsedData.setLock) {
      if (!$localStorage.get('localization')) {
        location.reload();
      }

      $localStorage.set('localization', parsedData.setLock);

      const { currentPage } = storage;
      storage.currentPage = '';
      shadow.page = this.$observe(null);
      setTimeout(() => {
        shadow.page = this.$observe(shadow.pages[currentPage]);
        storage.currentPage = currentPage;
      }, 0);
    }
    if (parsedData['show-page']) {
      // $router.set(storage.currentPage);
      storage.currentPage = parsedData['show-page'].name || parsedData['show-page'];
      const key = storage.currentPage;

      shadow.page = this.$observe(shadow.pages[key]);

      if (parsedData['show-page'].items) {
        Object.keys(parsedData['show-page'].items).forEach((itemKey) => {
          const scopeData = parsedData['show-page'].items[itemKey];
          if (scopeData && (scopeData.items || scopeData.data)) {
            if (!shadow.page.items[itemKey]) {
              shadow.page.items[itemKey] = {};
            }
            Object.assign(shadow.page.items[itemKey], scopeData);
          } else {
            shadow.page.items[itemKey] = scopeData;
          }
        });
      }
    }
    if (parsedData.error) {
      $alertMessage.create(parsedData.error, 'error');
    }
    if (parsedData.message) {
      $alertMessage.create(parsedData.message);
    }
    if (parsedData.warning) {
      $alertMessage.create(parsedData.warning, 'warning');
    }
    if (parsedData.info) {
      $alertMessage.create(parsedData.info, 'info');
    }
    if (parsedData.playSound) {
      // $playSound(parsedData.playSound);

    }
    if (parsedData.pageAction) {
      const currentPage = window.location.hash.slice(1);
      if (parsedData.pageAction.name !== currentPage) return;
      // if (parsedData.pageAction.playSound) {
      //   $playSound(parsedData.playSound);
      // }
      if (parsedData.pageAction.message) {
        $alertMessage.create(parsedData.pageAction.message);
      }
      if (parsedData.pageAction.error) {
        $alertMessage.create(parsedData.pageAction.error, 'error');
      }
      if (parsedData.pageAction.reload) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
    if (parsedData['set-cookies']) {
      $localStorage.set('session_id', parsedData['set-cookies']);
    }
    if (parsedData.componentUpdate) {
      const { name, response } = parsedData.componentUpdate;
      this.componentUpdateCallBack(name, response);
    }
  },
};

export { storage, shadow };
