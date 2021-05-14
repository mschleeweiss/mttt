import { createApp } from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import App from './App.vue'
import io from 'socket.io-client';

const socket = io("http://localhost:3000")

createApp(App)
    .use(VueSocketIOExt, socket)
    .mount("#app");
