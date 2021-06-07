<template>
  <div class="container">
    <div class="header">
      <mttt-button color="black" @click="showPaypalDialog = true">
        <font-awesome-icon :icon="['fab', 'paypal']" />
      </mttt-button>
      <mttt-button color="black" @click="showSettingsDialog = true">
        <font-awesome-icon icon="cog" />
      </mttt-button>
    </div>

    <div class="content">
      <div class="title">
        <mttt-anaglyph-text>MTTT*</mttt-anaglyph-text>
        <span class="subtitle">*Multimate Tic Tac Toe</span>
      </div>
      <div class="init">
        <mttt-button :click="createGame" color="green"
          >Create Game</mttt-button
        >
      </div>
    </div>
    <div class="footer">
    </div>
    <Settings v-if="showSettingsDialog" @close="showSettingsDialog = false" />
    <mttt-dialog v-if="showPaypalDialog">
      <template v-slot:header> ❤️❤️❤️ Donations ❤️❤️❤️ </template>
      <template v-slot:body>
        This game will always be ad-free. But hosting it properly costs a few bucks each month. 
        <br><br>
        To support this game, and my work, you can gift me some real-life coins on PayPal. 
        <br><br>
        Every donation will be greatly appreciated ❤️
        <span class="subtitle">Donations are voluntary. They come without a contract or service in return.</span>
    </template>
    <template v-slot:footer>
      <mttt-button class="smallMarginEnd" color="black" @click="showPaypalDialog = false">Fuck off</mttt-button>
      <mttt-button color="green" :click="onPressDonate">Donate</mttt-button>
    </template>
    </mttt-dialog>
  </div>
</template>

<script>
import Settings from '@/components/Settings.vue'

export default {
  name: 'Home',
  components: {
    Settings
  },
  data() {
    return {
      showInfoDialog: false,
      showPaypalDialog: false,
      showSettingsDialog: false,
    };
  },
  sockets: {
    gameCreated(gameId) {
      this.$router.push({ path: `/room/${gameId}` });
    },
  },
  methods: {
    createGame() {
      this.$socket.client.emit('createGame');
    },
    onPressDonate() {
      window.open("https://paypal.me/mschleeweiss", "_blank");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  padding: 0.5rem 1rem;
  z-index: 1;
}

.header {
  background: linear-gradient(
    90deg,
    rgb(var(--purple)) 0%,
    rgb(var(--yellow)) 100%
  );
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 15%);
  color: #282a36;
}
.content {
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--current-line));
  flex-grow: 1;
  text-align: center;
}
.title {
  margin-top: 1rem;
}
.init {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}
.subtitle {
  font-size: 0.5rem;
}
.footer {
  background: rgb(var(--background));
  box-shadow: 0 -5px 10px 0 rgb(0 0 0 / 15%);
}
</style>
