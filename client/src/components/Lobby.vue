<template>
  <div class="lobby-container">
    <my-button color="cyan">Join Team X</my-button>
    <my-button color="red">Join Team O</my-button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'Lobby',
  components: {
    'my-button': Button
  },
  methods: {
      joinTeamX() {
          this.$socket.client.emit("joinTeamX");
      },
      joinTeamO() {
          this.$socket.client.emit("joinTeamO");
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
