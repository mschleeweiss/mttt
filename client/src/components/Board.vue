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
            <button>{{ `[${outerRowIdx},${outerColIdx},${innerRowIdx},${innerColIdx}]`}}</button>
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
.outerRow {
  border: 0px solid red;
  width: 100%;
}

.outerCol {
  border: 2px solid green;
  width: 32%;
  float: left;
}

.innerRow {
  border: 0px solid yellow;
}

.innerCol {
  border: 0px solid purple;
}

button {
  height: 1rem;
}
</style>
