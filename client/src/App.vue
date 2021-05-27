<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  sockets: {
    clientConnected(socketId) {
      this.$store.commit('updateSocketId', socketId);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}
body {
  background-color: rgb(var(--background));
  color: rgb(var(--foreground));
  font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif;
}
input {
  font-family: inherit;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
