<template>
  <div class="board-container">
    <!-- rows of the outer board -->
    <div
      class="outerRow"
      v-for="(outerRow, outerRowIdx) in game.outerBoard.fields"
      :key="`outerRow-${outerRowIdx}`"
    >
      <!-- cols of the outer board -->
      <div
        class="outerCol"
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
            <button :class="{ 
              active: innerCol.active && innerCol.winner === ' ',
              x: innerCol.winner === 'X',
              o: innerCol.winner === 'O'
            }">
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data() {
    return {
      game: {
        id: 'LOKs',
        timestamp: '2021-05-23T13:44:00.877Z',
        admin: {
          id: '9dXf7r9YjADTQuKFAAAv',
          name: 'Player Unknown',
          connected: false,
        },
        startable: false,
        active: false,
        over: false,
        settings: {
          timeLimitInSeconds: 0,
        },
        outerBoard: {
          draw: false,
          fields: [
            [
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: 'O',
                      active: false,
                    },
                    {
                      winner: 'X',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
            ],
            [
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
            ],
            [
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
              {
                draw: false,
                fields: [
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                  [
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                    {
                      winner: ' ',
                      active: false,
                    },
                  ],
                ],
                winner: ' ',
              },
            ],
          ],
          winner: ' ',
        },
        players: [
          {
            id: '9dXf7r9YjADTQuKFAAAv',
            name: 'Player Unknown',
            connected: true,
          },
        ],
        moves: [],
        teams: {
          X: [],
          O: [],
        },
      },
    };
  },
  sockets: {
    gameChanged(data) {
      debugger; // eslint-disable-line
      this.game = data;
    },
  },
};
</script>

<style scoped>
.board-container {
  width: 100%;
  max-width: 23rem;
  margin-top: 2rem;
}
.outerRow {
  border: 0px solid red;
  width: 100%;
}

.outerCol {
  border: 0px solid green;
  width: 33.3%;
  float: left;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

.innerRow {
  border: 0px solid yellow;
}

.innerCol {
  border: 0px solid purple;
  margin-left: 2px;
}

button {
  height: 2rem;
  width: 2rem;
  border: 0px;
  background-color: #282a36;
}

button.active {
  background-color: #f1fa8c;
  cursor: pointer;
}
button.x {
  background-color: #8be9fd;
}
button.o {
  background-color: #ff5555;
}
</style>
