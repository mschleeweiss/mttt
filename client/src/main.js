import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';
import socket from './socket';
import router from './router';

createApp(App)
    .use(VueSocketIOExt, socket)
    .use(router)
    .mount("#app");
