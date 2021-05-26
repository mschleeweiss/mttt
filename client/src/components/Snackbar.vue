<template>
  <div class="snackbar" :class="{ show: visible }" :style="colorStyle">
    <slot> </slot>
  </div>
</template>

<script>
import { colorCombinations } from '@/constants';

export default {
  name: 'Snackbar',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    color: {
        type: String,
        default: "black"
    },
  },
  computed: {
    colorStyle() {
      return {
        backgroundColor: colorCombinations[this.color].bg,
        color: colorCombinations[this.color].fg,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 2;
  left: 50%;
  top: 30px;
  font-size: 17px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 15%);
  opacity: 0.9;
}

.snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
}

@keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 0.9;
  }
}
</style>
