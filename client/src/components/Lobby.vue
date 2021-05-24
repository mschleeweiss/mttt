<template>
  <div class="lobby-container">
    <Team team="X" :teams="teams" />
    <Team team="O" :teams="teams" />

    <ActionButton
      v-if="isAdmin"
      :click="startGame"
      :enabled="isStartable"
      color="green"
    >
      Start
    </ActionButton>
  </div>
</template>

<script>
import Team from '@/components/Team.vue';

export default {
  name: 'Lobby',
  components: {
    Team: Team,
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
</style>
