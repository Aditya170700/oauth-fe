<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Swal from "sweetalert2";
// import axios from "axios";
export default {
  name: "Oauth",
  computed: {
    ...mapState(["baseUrl"]),
  },
  data() {
    return {};
  },
  mounted() {
    if (this.$route.query.token) {
      localStorage.setItem("token_jwt", this.$route.query.token);
      Swal.fire({
        title: "Success",
        icon: "success",
      }).then(() => {
        this.$router.push("/home");
        this.loading = false;
      });
    }
  },
};
</script>
