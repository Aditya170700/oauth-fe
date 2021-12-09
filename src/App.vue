<template>
  <router-view />
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  beforeCreate() {
    if (localStorage.getItem("token_jwt") != null) {
      this.$store.commit("setToken", localStorage.getItem("token_jwt"));
      this.$store.commit(
        "setProfile",
        jwt_decode(localStorage.getItem("token_jwt"))
      );
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
