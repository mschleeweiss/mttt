<template>
  <div class="timer">{{ minutes }}:{{ seconds }}</div>
</template>

<script>
export default {
  name: 'Countdown',
  props: {
    running: {
      type: Boolean,
      default: false,
    },
    durationInSeconds: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      duration: this.durationInSeconds,
      timeout: null,
    };
  },
  computed: {
      minutes() {
          const minutes = Math.floor(this.duration / 60);
          Math.max(0, minutes);
          return minutes.toString().padStart(2, "0");
      },
      seconds() {
          const seconds = Math.floor(this.duration % 60);
          Math.max(0, seconds);
          return seconds.toString().padStart(2, "0");
      }
  },
  watch: {
    running: {
      handler(val) {
        if (val && this.duration > 0) {
          this.timeout = setTimeout(() => {
            this.duration--;
          }, 1000);
        } else if (!val) {
            clearTimeout(this.timeout);
        }
      },
    },
    durationInSeconds: {
        handler(val) {
            this.duration = val;
        }
    },
    duration: {
      immediate: true,
      handler(val) {
        if (val > 0 && this.running) {
          this.timeout = setTimeout(() => {
            this.duration--;
          }, 1000);
        }
      },
    },
  },
};
</script>

<style scoped>

.timer {
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: bold;
}
</style>
