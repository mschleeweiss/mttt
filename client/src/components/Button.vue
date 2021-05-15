<template>
  <button :style="myStyle" @click="click">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    click: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      myStyle: {
        backgroundColor: '#50fa7b',
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
