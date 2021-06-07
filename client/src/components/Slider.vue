<template>
  <div class="slider-container" :class="{ disabled: !enabled }">
    <input
      type="range"
      :min="min"
      :max="max"
      v-model="inputVal"
      class="slider"
      :disabled="!enabled"
      list="stepList"
    />
    <datalist id="stepList">
      <option v-for="step in steps" :key="step">{{ step }}</option>
    </datalist>
    <div class="labels">
      <span>{{ min }}</span
      ><span>{{ max }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    modelValue: {
      type: Number,
      default: 50,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    steps() {
      return [ ...Array(this.max - this.min + 1).keys() ].map(i => i + this.min);
    },
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', +val);
      },
    },
  },
};
</script>

<style scoped>
.slider-container.disabled {
  opacity: 0.4;
}

.slider {
  appearance: none;
  width: 100%;
  height: 1rem;
  border-radius: 5px;
  background: rgb(var(--background));
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.slider:not(:disabled):hover {
  cursor: pointer;
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(var(--purple));
}

.slider::-webkit-slider-thumb:not(:disabled) {
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(var(--yellow));
}

.slider::-moz-range-thumb:not(:disabled) {
  cursor: pointer;
}

.labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.25rem;
}
</style>