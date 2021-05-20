<template>
  <div class="container">
    <div class="header">
      <my-button :click="copyUrl" color="black"> Copy invite link </my-button>
    </div>

    <div class="content">
      <Lobby v-if="lobbyVisible" />
      <NotFound v-if="notFound" />
    </div>

    <div class="footer">Impressum dies das</div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Lobby from '@/components/Lobby.vue';
import NotFound from '@/components/NotFound.vue';

export default {
  name: 'Game',
  components: {
    'my-button': Button,
    Lobby: Lobby,
    NotFound: NotFound,
  },
  data() {
    return {
      notFound: false,
      game: null,
    };
  },
  computed: {
    gameId() {
      return this.$route.params.gameid;
    },
    lobbyVisible() {
      return !this.game?.active && !this.game?.over && !this.notFound;
    },
    boardVisible() {
      return this.game?.active && !this.game?.over && !this.notFound;
    }
  },
  mounted() {
    this.$socket.client.emit('joinGame', {
      gameId: this.gameId,
      name: 'Player 7',
    });
  },
  sockets: {
    gameJoined(game) {
      this.game = game;
    },
    exception(data) {
      this.notFound = data.message === 'game_not_found';
    },
  },
  methods: {
    copyUrl() {
      const dummy = document.createElement('input');
      const url = window.location.href;

      document.body.appendChild(dummy);
      dummy.value = url;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    },
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
  min-height: 2rem;
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
