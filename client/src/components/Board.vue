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
                  x: innerCol.winner === 'X',
                  o: innerCol.winner === 'O',
                }"

                @click="makeMove(outerRowIdx, outerColIdx, innerRowIdx, innerColIdx)"
              ></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    makeMove(outerRow, outerCol, innerRow, innerCol) {
      debugger //eslint-disable-line
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
  border: 0px solid red;
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

.innerCol {
  margin-left: 2px;
}

button {
  height: 2rem;
  width: 2rem;
  border: 0px;
  border-radius: 2px;
  background-color: rgba(40, 42, 54, 0.6);
}

button.active {
  background-color: rgba(241, 250, 140, 0.6);
  cursor: pointer;
  transition-duration: 0.3s;
}

button.active:hover {
  background-color: rgba(241, 250, 140, 1);
}

.x {
  background-color: rgba(139, 233, 253, 0.75);
}
.o {
  background-color: rgba(255, 85, 85, 0.75);
}
</style>
