import { createStore } from 'vuex'

export const store = createStore({
  state: {
    socketId: ""
  },
  mutations: {
    update (state, id) {
      state.socketId = id;
    }
  }
});
