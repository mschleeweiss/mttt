<template>
  <div class="team-panel">
    <div class="header">
      Team {{ team }}
      <ActionButton class="circle" :color="team == 'X' ? 'cyan' : 'red'" :click="joinTeam">
        <font-awesome-icon icon="plus" />
      </ActionButton>
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
  padding: 0;
  margin: 0;
  text-align: start;
}

li {
  border-bottom: 1px solid #363948;
  padding: 0.5rem 1rem;
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid rgb(var(--background));
  padding: 0.5rem;
  font-weight: 900;
}

.emptylist {
  padding: 0.5rem;
}

.circle {
  padding: 0.5rem 0.65rem;
}
</style>
