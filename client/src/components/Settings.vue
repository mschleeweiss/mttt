<template>
  <Dialog>
    <template v-slot:header> Settings </template>
    <template v-slot:body>
      <form>
        <label for="fname">Nickname</label>
        <input type="text" v-model="username" />
      </form>
    </template>
    <template v-slot:footer>
        <ActionButton color="green" :click="onPressOK">OK</ActionButton>
        </template>
  </Dialog>
</template>

<script>
export default {
  name: 'Settings',
  data() {
      return {
          username: this.$store.state.name
      }
  },
  methods: {
      onPressOK() {
          if (0 < this.username.length && this.username.length < 20) {
              this.$store.commit('updateName', this.username);
              this.$socket.client.emit('changeName', { name: this.username });
              this.$emit('close');
          }
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  box-sizing: border-box;
  font-size: 1rem;
  background-color: #282a36;
  border: 1px solid #121319;
  border-radius: 2px;
  color: #f8f8f2;
  outline: none;
}

input:focus {
  border: 1px solid rgb(98, 114, 164);
}
</style>
