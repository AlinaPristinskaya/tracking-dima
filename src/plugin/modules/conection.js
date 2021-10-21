import dataProcessing from './dataProcessing';
import $alertMessage from './alertMessage';
import $localStorage from './localeStorageBuffer';

export default {
  soketConect: null,
  PreloaderCallBack: null,

  isRequesting: false,
  isReconection: false,

  ping: null,

  created() {
    this.conection();
  },

  getPreloaderCallBack(callBack) {
    this.PreloaderCallBack = callBack;
  },

  conection(isReconnect = false) {
    this.PreloaderCallBack(true);

    fetch(settings.url)
      .then((resopnse) => resopnse.json())
      .then((resopnseData) => {
        console.log('--->', 'ws:', 'Проверка соединения');

        if (!this.is_socketConnect()) {
          const socket = resopnseData.socket.connect;
          this.createWebSocket(socket, isReconnect);
        }
      })
      .catch(() => {
        setTimeout(() => {
          this.conection();
        }, 5000);
      });
  },

  is_socketConnect(){
    return !(!this.soketConect || (this.soketConect.readyState !== 0 && this.soketConect.readyState !== 1))
  },

  createWebSocket(socketUrl, isReconnect = false) {
    try {
      console.log('--->', 'ws:', 'Новое соединение');

      const socket = new WebSocket(socketUrl);
      this.soketConect = socket;

      socket.onopen = ((...params) => {
        this.onOpenWebSocket(isReconnect, ...params);
      });
      socket.onmessage = this.onSendWebSocket.bind(this);

      socket.onclose = (event) => {
        this.onCloseWebSocket(event);
      };

      socket.onerror = (event) => {
        this.onErrorWebSocket(event);
      };
    } catch (e) {
      console.log('--->', 'ws:', 'Соединение не удалось');
      this.conection();
    }
  },


  webSoketSendMessage(uri, data, params) {
    if (this.is_socketConnect()) {
      this.PreloaderCallBack(true);

      const session_id = $localStorage.get('session_id');
      this.soketConect.send(JSON.stringify({
        uri,
        data,
        params,
        session_id,
      }));

      console.log('---> ws: %c↑', "color: green; font-size:18px", {
        uri,
        data,
        params,
        session_id,
      });
    }
  },

  onOpenWebSocket(isReconnect = false) {
    console.log('--->', 'ws:', 'Соединение открыто');
    this.PreloaderCallBack(false);

    // this.initPing();

    if (isReconnect) {
      $alertMessage.create('Connection restored', 'info');
      this.webSoketSendMessage('/ping/')
    } else {   // load menu + pages
      this.webSoketSendMessage('/acl/', null, null, true);
      this.webSoketSendMessage('/acl/load/', null, null, true);
    }
  },

  onSendWebSocket(event) {
    const data = JSON.parse(event.data);
    console.log('---> ws: %c↓', "color: red; font-size:18px", data);

    this.PreloaderCallBack(false);

    dataProcessing.dataProcessing(event.data);
  },

  onCloseWebSocket(event) {
    console.log('--->', 'ws:', 'Соединение закрыто');

    // this.stopPing();

    $alertMessage.create('Disconnection', 'warning');

    this.conection(true);
  },

  onErrorWebSocket(event) {
    console.log('--->', 'ws:', 'Соединение оборвано');
  },

  initPing() {
    if (!this.ping)
      this.ping = setInterval(() => {
        if (this.is_socketConnect()) {
          const uri = '/ping/';
          const session_id = $localStorage.get('session_id');

          this.soketConect.send(JSON.stringify({ uri, session_id }));

          console.log('---> ws: %c↑', "color: green; font-size:18px", { uri, session_id });
        }
      }, 60 * 1000)
  },

  stopPing() {
    if (this.ping)
      clearInterval(this.ping);
  }
};
