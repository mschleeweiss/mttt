<template>
  <div class="container">
    <div class="header">Please donate ❤️</div>

    <div class="content">
      <div class="title">
        <h1 class="anaglyph">MTTT*</h1>
        <span class="subtitle">*Multimate Tic Tac Toe</span>
      </div>
      <div class="init">
        <my-button :click="createGame" color="green">Create Game</my-button>
      </div>
    </div>

    <div class="footer">Impressum dies das</div>
  </div>
</template>

<script>

import Button from '@/components/Button.vue'

export default {
  name: 'Home',
  components: {
    'my-button': Button
  },
  sockets: {
    gameCreated(gameId) {
      this.$router.push({ path: `/join/${gameId}` })
    }
  },
  methods: {
    createGame() {
      this.$socket.client.emit("createGame");
    }
  }
}
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
  height: 2rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 15%);
  z-index: 1;
}

.header {
  background: rgb(189, 147, 249);
  background: linear-gradient(
    90deg,
    rgba(189, 147, 249, 1) 0%,
    rgba(241, 250, 140, 1) 100%
  );
  color: #282a36;
}
.content {
  display: flex;
  flex-direction: column;
  background-color: #44475a;
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
.anaglyph {
  box-sizing: content-box;
  border: none;
  font-family: 'Permanent Marker', Helvetica, sans-serif;
  font-size: 5rem;
  letter-spacing: 3px;
  margin: 0;
  text-align: center;
  text-overflow: clip;
  text-shadow: -4px 0 1px #8be9fd, 4px 0 1px #ff5555;
}
.subtitle {
  font-size: 0.5rem;
}
.footer {
  background: #282a36;
}
</style>
