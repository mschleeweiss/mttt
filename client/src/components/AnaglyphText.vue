<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AnaglyphText'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  box-sizing: content-box;
  border: none;
  font-family: 'Permanent Marker', Helvetica, sans-serif;
  font-size: 5rem;
  letter-spacing: 3px;
  margin: 0;
  text-align: center;
  text-overflow: clip;
  text-shadow: -4px 0 1px #8be9fd, 4px 0 1px #ff5555;
}
</style>
