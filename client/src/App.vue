<template>
  <Home />
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
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
  background-color: #50fa7b;
  border: 0;
  border-radius: 1.5rem;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 15%);
  color: #282a36;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  opacity: 0.75;
  transition: 0.3s;
}
button:hover {
  opacity: 1
}
</style>
