import { createApp } from 'vue';
import App from './App.vue';

import VueSocketIOExt from 'vue-socket.io-extended';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'

import { store } from './store';
import { socket } from './socket';
import { router } from './router';

import ActionButton from './components/ActionButton'
import AnaglyphText from './components/AnaglyphText'
import Countdown from './components/Countdown'
import Dialog from './components/Dialog'
import Slider from './components/Slider'
import Snackbar from './components/Snackbar'
import Switch from './components/Switch'

library.add(faCog)
library.add(faLink)
library.add(faChevronLeft)
library.add(faPlus)
library.add(faPaypal)

import "@/assets/global.css"

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueSocketIOExt, socket);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('mttt-anaglyph-text', AnaglyphText);
app.component('mttt-button', ActionButton);
app.component('mttt-countdown', Countdown);
app.component('mttt-dialog', Dialog);
app.component('mttt-slider', Slider);
app.component('mttt-snackbar', Snackbar);
app.component('mttt-switch', Switch);
app.mount("#app");
