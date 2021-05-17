<template>
  <div class="lobby-container">
    <my-button :color="team == 'X' ? 'cyan' : 'red'" :click="joinTeam">
      Join Team {{ team }}
    </my-button>
    <ul>
      <li v-for="member in teamMembers" :key="member.id">{{ member.name }}</li>
      </ul>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Lobby',
  components: {
    'my-button': Button,
  },
  props: {
    teams: Object,
    team: String,
  },
  computed: {
    gameId() {
      return this.$route.params.gameid;
    },
    teamMembers() {
      return this.teams[this.team];
    }
  },
  methods: {
    joinTeam() {
      this.$socket.client.emit(`joinTeam`, {
        gameId: this.gameId,
        team: this.team
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
