import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { socket } from './socket';
import { store } from './store';
import { router } from './router';

import ActionButton from './components/ActionButton'
import AnaglyphText from './components/AnaglyphText'
import Dialog from './components/Dialog'
import Snackbar from './components/Snackbar'

library.add(faCog)
library.add(faLink)
library.add(faChevronLeft)
library.add(faPlus)

import "@/assets/global.css"

const app = createApp(App)
    .use(VueSocketIOExt, socket)
    .use(router)
    .use(store);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('mttt-button', ActionButton);
app.component('mttt-anaglyph-text', AnaglyphText);
app.component('mttt-dialog', Dialog);
app.component('mttt-snackbar', Snackbar);
app.mount("#app");
