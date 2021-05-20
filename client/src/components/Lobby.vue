<template>
  <div class="lobby-container">

    <Team team="X" :teams="teams"/>
    <Team team="O" :teams="teams"/>

    <my-button v-if="isAdmin" :click="startGame" :enabled="isStartable" color="green">
      Start
    </my-button>
  </div>
</template>

<script>
import Team from '@/components/Team.vue'


export default {
  name: 'Lobby',
  components: {
    'Team': Team
  },
  computed: {
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
    }
  },
  watch: {
    socketId(old, nu) {
      console.log(old, nu);
    }
  },
  data() {
    return {
      game: null
    }
  },
  sockets: {
    gameJoined(data) {
      this.game = data;
    },
    lobbyChanged(data) {
      this.game = data;
    }
  },
  methods: {
    startGame() {
      alert(5);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
