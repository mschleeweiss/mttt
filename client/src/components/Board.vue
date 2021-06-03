<template>
  <div class="board">
    <div v-if="!game.over" class="current-player">
      Current player:
      <span
        class="playername"
        :class="{
          pulse: socketId === game.currentPlayer.id,
          x: game.teams.X.map((p) => p.id).includes(game.currentPlayer.id),
          o: game.teams.O.map((p) => p.id).includes(game.currentPlayer.id),
        }"
        >{{ game.currentPlayer.name }}</span
      >
    </div>
    <div class="field-container">
      <!-- rows of the outer board -->
      <div
        class="outerRow"
        v-for="(outerRow, outerRowIdx) in game.outerBoard.fields"
        :key="`outerRow-${outerRowIdx}`"
      >
        <!-- cols of the outer board -->
        <div
          class="outerCol"
          :class="{
            x: outerCol.winner === 'X',
            o: outerCol.winner === 'O',
          }"
          :data-winner="outerCol.winner"
          v-for="(outerCol, outerColIdx) in outerRow"
          :key="`outerCol-${outerColIdx}`"
        >
          <div
            class="innerRow"
            v-for="(innerRow, innerRowIdx) in outerCol.fields"
            :key="`innerRow-${innerRowIdx}`"
          >
            <div
              class="innerCol"
              :data-winner="innerCol.winner"
              v-for="(innerCol, innerColIdx) in innerRow"
              :key="`innerCol-${innerColIdx}`"
            >
              <button
                :class="{
                  active: innerCol.active && innerCol.winner === ' ',
                  clickable: game.currentPlayer.id === socketId,
                  x: innerCol.winner === 'X',
                  o: innerCol.winner === 'O',
                }"
                @click="
                  makeMove(outerRowIdx, outerColIdx, innerRowIdx, innerColIdx)
                "
              >
                {{ innerCol.winner }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" class="timer-container">
      <div class="timer x">9:59</div>
      <div class="timer o">8:50</div>
    </div>
  </div>
</template>

<script>
import '@/assets/global.css';

export default {
  name: 'Board',
  props: {
    game: Object,
  },
  computed: {
    gameId() {
      return this.$route.params.gameid;
    },
    socketId() {
      return this.$store.state.socketId;
    },
    myTeam() {
      const isX = this.game?.teams.X.map((p) => p.id).includes(this.socketId);
      const isO = this.game?.teams.O.map((p) => p.id).includes(this.socketId);

      return isX ? 'X' : isO ? 'O' : ' ';
    },
  },
  methods: {
    makeMove(outerRow, outerCol, innerRow, innerCol) {
      this.$socket.client.emit('makeMove', {
        outerRow,
        outerCol,
        innerRow,
        innerCol,
        gameId: this.gameId,
      });
    },
  },
};
</script>

<style scoped>
.board {
  width: 100%;
  max-width: 23rem;
  margin-top: 2rem;
}
.current-player {
  margin-bottom: 1rem;
}
.playername {
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
}
.outerRow {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outerCol {
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.25rem;
}

.outerCol::before {
  position: absolute;
  font-size: 8rem;
  content: attr(data-winner);
  color: rgba(0, 0, 0, 0.5);
}

.innerRow {
  display: flex;
  justify-content: center;
  align-items: center;
}

.innerCol {
  display: flex;
  margin: 0.125rem;
}

button {
  height: 2rem;
  width: 2rem;
  border: 0px;
  border-radius: 2px;
  background-color: rgba(var(--background), 0.6);
  color: rgba(0, 0, 0, 0.4);
}

button.active {
  background-color: rgba(var(--yellow), 0.6);
  transition-duration: 0.3s;
}

button.active.clickable:hover {
  cursor: pointer;
  background-color: rgba(var(--yellow), 1);
}

.x {
  background-color: rgba(var(--cyan), 0.75);
}
.o {
  background-color: rgba(var(--red), 0.75);
}

.o.pulse {
  animation: redpulse 1s infinite;
}

.x.pulse {
  animation: cyanpulse 1s infinite;
}

@keyframes redpulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--red), 0.8);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--red), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--red), 0);
  }
}

@keyframes cyanpulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--cyan), 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--cyan), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--cyan), 0);
  }
}

.timer-container {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  justify-content: space-between;
}
</style>
