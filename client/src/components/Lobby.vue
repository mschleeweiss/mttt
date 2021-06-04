<template>
  <div class="lobby-container">
    <div class="players">
      <Team team="X" :teams="teams" />
      <Team team="O" :teams="teams" />
    </div>
    <div class="admintools">
      <div v-if="isAdmin && !isStartable">
        To start a game, both teams must have at least one member
      </div>
      <mttt-button
        v-if="isAdmin"
        class="startBtn"
        :click="startGame"
        :enabled="isStartable"
        color="green"
      >
        Start
      </mttt-button>
      <div class="settings">
        <h2>Settings</h2>
        <div class="timer-toggle">
          <span>Activate timer</span>
          <mttt-switch v-model="isTimerActive" :enabled="isAdmin" />
        </div>
        <div class="init-time smallMarginTop">
          <span>Initial time per team</span>
          <mttt-slider
            class="smallMarginTop"
            v-model="timeLimit"
            :min="1"
            :max="10"
            :enabled="isAdmin && isTimerActive"
          />
        </div>
      </div>
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
    isTimerActive: {
      get: function () {
        return this.game?.settings.timerActive ?? false;
      },
      set: function (timerActive) {
        this.game.settings.timerActive = timerActive;
        this.$socket.client.emit('changeSetting', {
          gameId: this.gameId,
          timerActive,
        });
      },
    },
    timeLimit: {
      get: function () {
        return this.game?.settings.timeLimitInMinutes ?? 0;
      },
      set: function (timeLimitInMinutes) {
        this.game.settings.timeLimitInMinutes = timeLimitInMinutes;
        this.$socket.client.emit('changeSetting', {
          gameId: this.gameId,
          timeLimitInMinutes,
        });
      },
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.settings {
  width: 75%;
  display: flex;
  flex-direction: column;
  text-align: start;
}

.timer-toggle {
  display: flex;
  justify-content: space-between;
}

.init-time {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
