<template>
  <button :style="myStyle" @click="click">
    <slot> </slot>
  </button>
</template>

<script>

const COLORS = {
  "green": {
    bg: "#50fa7b",
    fg: "#282a36"
  },
  "cyan": {
    bg: "#8be9fd",
    fg: "#282a36"
  },
  "red": {
    bg: "#ff5555",
    fg: "#282a36"
  },
  "black": {
    bg: "#282a36",
    fg: "#f8f8f2"
  }
};
export default {
  name: 'Button',
  props: {
    click: Function,
    color: String
  },
  data() {
    return {
      myStyle: {
        backgroundColor: COLORS[this.color].bg,
        color: COLORS[this.color].fg
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
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
  opacity: 1;
}
</style>
