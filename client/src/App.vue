<template>
  <Home />
</template>

<script>
import Home from './components/Home.vue'
// import io from 'socket.io-client'; //eslint-disable-line

export default {
  name: 'App',
  components: {
    Home
  },
  // beforeMount() {
  //   const socket = io("http://localhost:3000")
  //   socket.emit("msgToServer", "huan")
  // }
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
  background-color: #282a36;
  color: #f8f8f2;
  font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
button {
  border: 0;
  border-radius: 4px;
  background-color: #50fa7b;
  color: #000;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  padding: 10px 18px;
  opacity: 0.6;
  transition: 0.3s;
}
button:hover {
  opacity: 1
}
</style>
