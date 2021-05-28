<template>
  <div class="board">
    <div v-if="!game.over" class="current-player">
      Current player:
      <span
        class="playername"
        :class="{
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
          v-for="(outerCol, outerColIdx) in outerRow"
          :key="`outerCol-${outerColIdx}`"
        >
          <div
            class="innerRow"
            v-for="(innerRow, innerRowIdx) in outerCol.fields"
            :key="`innerRow-${innerRowIdx}`"
          >
            <span
              class="innerCol"
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
            </span>
          </div>
        </div>
      </div>
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
  width: 100%;
}

.outerCol {
  border-radius: 4px;
  width: 32%;
  float: left;
  margin: 2px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
}

.innerRow {
  display: inline-flex;
}

.innerCol {
  margin-left: 2px;
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
</style>
