<template>
  <div class="lobby-container">

    <Team team="X" :teams="teams"/>
    <Team team="O" :teams="teams"/>

    <my-button :click="startGame" color="green">
      Start
    </my-button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Team from '@/components/Team.vue'


export default {
  name: 'Lobby',
  components: {
    'my-button': Button,
    'Team': Team
  },
  computed: {
    teams() {
      return this.game?.teams ?? {};
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
