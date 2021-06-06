<template>
  <div class="container">
    <mttt-snackbar color="green" :visible="showSnackbar">URL copied!</mttt-snackbar>
    <div class="header">
      <div class="left">
        <mttt-button class="smallMarginEnd" :click="navBack" color="black">
          <font-awesome-icon icon="chevron-left" />
        </mttt-button>
        <mttt-button :click="copyUrl" color="black">
          <font-awesome-icon icon="link" />
          <span class="hidden-xs"> Copy invite link</span>
        </mttt-button>
      </div>
      <mttt-button color="black" @click="showSettings = true">
        <font-awesome-icon icon="cog" />
      </mttt-button>
    </div>

    <div class="content">
      <Lobby v-if="lobbyVisible" />
      <Board v-if="boardVisible" :game="game" />
      <NotFound v-if="notFound" />
    </div>
    <Settings v-if="showSettings" @close="showSettings = false" />
    <mttt-dialog v-if="showGameOver" @close="showGameOver = false">
      <template v-slot:header>Game over!</template>
      <template v-slot:body>
        <mttt-anaglyph-text class="gameOverEmote">{{ gameOverMsg }}</mttt-anaglyph-text>
        <div class="gameOverTxt">
          Team {{ game.outerBoard.winner }} has won the game
        </div>
      </template>
      <template v-slot:footer>
        <mttt-button color="green" :click="onCloseGameOver">OK</mttt-button>
      </template>
    </mttt-dialog>
  </div>
</template>

<script>
import Lobby from '@/components/Lobby.vue';
import NotFound from '@/components/NotFound.vue';
import Board from '@/components/Board.vue';
import Settings from '@/components/Settings.vue';

import { emoticons } from '@/constants';

export default {
  name: 'Game',
  components: {
    Board,
    Lobby,
    NotFound,
    Settings,
  },
  data() {
    return {
      game: null,
      notFound: false,
      showSnackbar: false,
      showSettings: false,
      showGameOver: false,
    };
  },
  computed: {
    gameId() {
      return this.$route.params.gameid;
    },
    socketId() {
      return this.$store.state.socketId;
    },
    lobbyVisible() {
      return !this.game?.active && !this.game?.over && !this.notFound;
    },
    boardVisible() {
      return (this.game?.active || this.game?.over) && !this.notFound;
    },
    myTeam() {
      const isX = this.game?.teams.X.map((p) => p.id).includes(this.socketId);
      const isO = this.game?.teams.O.map((p) => p.id).includes(this.socketId);

      return isX ? 'X' : isO ? 'O' : ' ';
    },
    gameOverMsg() {
      return this.game?.outerBoard.winner === this.myTeam
        ? emoticons.happy
        : emoticons.dead;
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
      if (game.over) {
        this.showGameOver = true;
      }
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
    navBack() {
      // todo: leave game when in lobby
      // show warning when game is in progress? forfeit?
      if (this.hasHistory()) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    onCloseGameOver() {
      this.showGameOver = false;
    },
    hasHistory() {
      return window.history.length > 2;
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
  flex-grow: 1;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: rgb(var(--current-line));
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

.gameOverEmote {
  font-size: 3rem;
}

.gameOverTxt {
  text-align: center;
}

@media screen and (max-width: 576px) and (min-width: 0px) {
  .hidden-xs {
    display: none;
  }
}
</style>
