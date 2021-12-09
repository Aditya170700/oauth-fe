import { createStore } from "vuex";

export default createStore({
  state: {
    baseUrl: "http://localhost:5000/api/v1/",
    dataProfile: null,
    tokenJwt: null,
  },
  mutations: {
    setProfile(state, payload) {
      state.dataProfile = payload;
    },
    setToken(state, payload) {
      state.tokenJwt = payload;
    },
    logout(state) {
      state.dataProfile = null;
      state.tokenJwt = null;
      localStorage.removeItem("token_jwt");
    },
  },
  getters: {
    getProfile(state) {
      return state.dataProfile;
    },
  },
  actions: {},
  modules: {},
});
