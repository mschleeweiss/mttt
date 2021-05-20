import { createStore } from 'vuex'

export const store = createStore({
  state: {
    socketId: sessionStorage.socketId ?? "",
    name: localStorage.name ?? "Player Unknown"
  },
  mutations: {
    updateSocketId (state, id) {
      state.socketId = id;
      sessionStorage.socketId = id;
    },
    updateName (state, name) {
      state.name = name;
      localStorage.name = name;
    }
  }
});
