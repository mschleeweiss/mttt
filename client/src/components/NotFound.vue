<template>
  <div class="not-found">
    <div>
      <mttt-anaglyph-text class="medium-sized"> (ﾉ °益°)ﾉ 彡 ┻━┻ </mttt-anaglyph-text>
      <h1>Game not found</h1>
      <span>Tell your friend to send you the proper link!</span>
      <span class="subtext">Maybe the error is on our side... but probably not!</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.not-found {
  align-items: center;
  display: flex;
  height: 100%;
}

.medium-sized {
  font-size: 4rem;
}

.subtext {
  font-size: 0.5rem;
  display: block;
}
</style>
