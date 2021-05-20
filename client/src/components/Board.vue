<template>
  <div class="board-container">

Das Spielbrett
  </div>
</template>

<script>

export default {
  name: 'Board',
  sockets: {
    gameChanged(data) {
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
