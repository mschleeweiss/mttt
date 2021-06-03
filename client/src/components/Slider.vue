<template>
  <div class="slidecontainer">
    <input type="range" :min="min" :max="max" v-model="inputVal" class="slider" />
    <div class="labels">
      <span>{{ min }}</span
      ><span>{{ max }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: ['modelValue', 'min', 'max'],
  computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
};
</script>

<style scoped>
.slider {
  appearance: none;
  width: 100%;
  height: 1rem;
  border-radius: 5px;
  background: rgb(var(--background));
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(var(--purple));
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(var(--yellow));
  cursor: pointer;
}

.labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.25rem;
}
</style>