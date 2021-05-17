<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  sockets: {
    
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
</style>
