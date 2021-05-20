import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';
import { socket } from './socket';
import { store } from './store';
import { router } from './router';

import Button from './components/Button'

const app = createApp(App)
    .use(VueSocketIOExt, socket)
    .use(router)
    .use(store);

app.component('my-button', Button)
app.mount("#app");
