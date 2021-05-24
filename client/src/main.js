import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';
import { socket } from './socket';
import { store } from './store';
import { router } from './router';

import ActionButton from './components/ActionButton'
import AnaglyphText from './components/AnaglyphText'

const app = createApp(App)
    .use(VueSocketIOExt, socket)
    .use(router)
    .use(store);

app.component('ActionButton', ActionButton);
app.component('AnaglyphText', AnaglyphText);
app.mount("#app");
