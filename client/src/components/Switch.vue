<template>
  <label class="switch-container" :class="{ disabled: !enabled }">
    <input type="checkbox" class="switch" v-model="inputVal" :disabled="!enabled" />
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: 'Switch',
  props: {
      modelValue: {
          type: Boolean,
          default: true,
      },
      enabled: {
          type: Boolean,
          default: true
      }
  },
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
.switch-container {
  position: relative;
  display: inline-block;
  width: 4rem;
  height: 2rem;
}

/* Hide default HTML checkbox */
.switch-container input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-container.disabled {
    opacity: .4;
}

/* The slider */
.slider {
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 15%);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(var(--background));
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.5rem;
  width: 1.5rem;
  left: 0.25rem;
  bottom: 0.25rem;
  background-color: rgb(var(--foreground));
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgb(var(--purple));
}

input:checked + .slider:before {
  transform: translateX(2rem);
}

/* Rounded sliders */
.slider.round {
  border-radius: 2rem;
}

.slider.round:before {
  border-radius: 50%;
}
</style>