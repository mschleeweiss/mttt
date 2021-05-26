<template>
  <button :style="colorStyle" @click="click" :disabled="!enabled">
    <slot> </slot>
  </button>
</template>

<script>

import { colorCombinations } from '@/constants'

export default {
  name: 'Button',
  props: {
    click: Function,
    color: {
      type: String,
      default: "black"
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    colorStyle() {
      const myStyle = {};
      if (this.enabled) {
        myStyle.backgroundColor = colorCombinations[this.color].bg;
        myStyle.color = colorCombinations[this.color].fg;
      }
      return myStyle;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  border: 0;
  border-radius: 1.5rem;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 15%);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  opacity: 0.75;
  transition: 0.3s;
}
button:disabled {
  background-color: #fff;
  color: #999;
}
button:not([disabled]):hover {
  opacity: 1;
  cursor: pointer;
}
</style>
