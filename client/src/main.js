import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import router from './router'

const socket = io("http://localhost:3000")


createApp(App)
    .use(VueSocketIOExt, socket)
    .use(router)
    .mount("#app");
