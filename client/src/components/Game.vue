<template>
  <div class="container">
    <Snackbar color="green" :visible="showSnackbar">URL copied!</Snackbar>
    <div class="header">
      <div class="left">
      <ActionButton class="smallMarginEnd" :click="copyUrl" color="black">
        <font-awesome-icon icon="chevron-left" />
      </ActionButton>
      <ActionButton :click="copyUrl" color="black">
        <font-awesome-icon icon="link" /> <span class="hidden-xs">Copy invite link</span>
      </ActionButton>
      </div>
      <ActionButton color="black" @click="showDialog = true">
        <font-awesome-icon icon="cog" />
      </ActionButton>
    </div>

    <div class="content">
      <Lobby v-if="lobbyVisible" />
      <Board v-if="boardVisible" :game="game" />
      <NotFound v-if="notFound" />
    </div>

    <div class="footer">Impressum dies das</div>
    <Settings v-if="showDialog" @close="showDialog = false" />
  </div>
</template>

<script>
import Lobby from '@/components/Lobby.vue';
import NotFound from '@/components/NotFound.vue';
import Board from '@/components/Board.vue';
import Settings from '@/components/Settings.vue'

export default {
  name: 'Game',
  components: {
    Board,
    Lobby,
    NotFound,
    Settings
  },
  data() {
    return {
      game: null,
      notFound: false,
      showSnackbar: false,
      showDialog: false
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
      return (this.game?.active || this.game?.over) && !this.notFound;
    },
  },
  mounted() {
    this.$socket.client.emit('joinGame', {
      gameId: this.gameId,
    });
  },
  sockets: {
    gameStateChanged(game) {
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

      this.showSnackbar = true;
      window.setTimeout(() => (this.showSnackbar = false), 3000);
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
  z-index: 1;
}

.header {
  background: linear-gradient(
    90deg,
    rgba(var(--purple), 1) 0%,
    rgba(var(--yellow), 1) 100%
  );
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 15%);
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--current-line));
  flex-grow: 1;
  text-align: center;
  align-items: center;
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
  background: rgb(var(--background));;
  box-shadow: 0 -5px 10px 0 rgb(0 0 0 / 15%);

}

@media screen and (max-width: 576px) and (min-width: 0px) {
  .hidden-xs {
    display: none;
  }
}
</style>
