<template>
  <div class="lobby-container">
    <div class="players">
      <Team team="X" :teams="teams" />
      <Team team="O" :teams="teams" />
    </div>
    <div class="admintools">
      <div v-if="isAdmin && !isStartable">To start a game, both teams must have at least one member</div>
      <mttt-button
        v-if="isAdmin"
        class="startBtn"
        :click="startGame"
        :enabled="isStartable"
        color="green"
      >
        Start
      </mttt-button>
    </div>
  </div>
</template>

<script>
import Team from '@/components/Team.vue';

export default {
  name: 'Lobby',
  components: {
    Team,
  },
  computed: {
    gameId() {
      return this.$route.params.gameid;
    },
    socketId() {
      return this.$store.state.socketId;
    },
    teams() {
      return this.game?.teams ?? {};
    },
    isAdmin() {
      return this.$store.state.socketId === this.game?.admin.id;
    },
    isStartable() {
      return this.game?.startable ?? false;
    },
  },
  data() {
    return {
      game: null,
    };
  },
  sockets: {
    gameStateChanged(data) {
      this.game = data;
    },
  },
  methods: {
    startGame() {
      this.$socket.client.emit('startGame', {
        gameId: this.gameId,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lobby-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.players {
  width: 35%;
  height: 100%;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
}

.admintools {
  width: 65%;
  box-sizing: border-box;
  padding: 2rem;
}

.startBtn {
  margin: 1rem;
}

@media screen and (max-width: 576px) and (min-width: 0px) {
  .players {
    width: 100%;
    height: initial;
  }

  .admintools {
    width: 100%;
    height: initial;
  }
}
</style>
