import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import { socket } from './socket';
import { store } from './store';
import { router } from './router';

import ActionButton from './components/ActionButton'
import AnaglyphText from './components/AnaglyphText'
import Dialog from './components/Dialog'
import Snackbar from './components/Snackbar'

library.add(faCog)

const app = createApp(App)
    .use(VueSocketIOExt, socket)
    .use(router)
    .use(store);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('ActionButton', ActionButton);
app.component('AnaglyphText', AnaglyphText);
app.component('Dialog', Dialog);
app.component('Snackbar', Snackbar);
app.mount("#app");
