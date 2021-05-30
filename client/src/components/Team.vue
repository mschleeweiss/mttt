<template>
  <div class="team-panel">
    <div class="header">
      <mttt-button class="joinBtn" :color="team == 'X' ? 'cyan' : 'red'" :click="joinTeam">
         Join Team {{ team }}
      </mttt-button>
    </div>
  <div class="emptylist" v-if="!teamMembers.length">Nobody joined</div>
    <ul v-if="teamMembers.length">
      <li v-for="member in teamMembers" :key="member.id">{{ member.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Team',
  props: {
    teams: Object,
    team: String,
  },
  computed: {
    gameId() {
      return this.$route.params.gameid;
    },
    teamMembers() {
      return this.teams[this.team] ?? [];
    },
  },
  methods: {
    joinTeam() {
      this.$socket.client.emit(`joinTeam`, {
        gameId: this.gameId,
        team: this.team,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0rem 4rem;
  margin: 0;
  text-align: start;
}

li {
  padding: 0.5rem 1rem;
}

li:not(:last-child) {
  border-bottom: 1px solid #363948;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
}

.emptylist {
  padding: 0.5rem;
}

.joinBtn {
  width: 100%;
}
</style>
