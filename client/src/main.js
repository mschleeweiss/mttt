import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';
import { socket } from './socket';
import { store } from './store';
import { router } from './router';

createApp(App)
    .use(VueSocketIOExt, socket)
    .use(router)
    .use(store)
    .mount("#app");
