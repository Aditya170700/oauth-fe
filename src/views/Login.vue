<template>
  <main class="form-signin">
    <form>
      <img
        class="mb-4"
        src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg"
        alt=""
        width="72"
        height="57"
      />
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating mb-2">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <button
        class="w-100 btn btn-lg btn-primary mb-2"
        type="button"
        @click="login"
        :disabled="loading"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="loading"
        ></span>
        Sign in
      </button>
      <button
        class="w-100 btn btn-lg btn-info mb-2 text-white"
        type="button"
        @click="oauth"
        :disabled="loading"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="loading"
        ></span>
        Google sign in
      </button>
      <p class="mt-5 mb-3 text-muted">
        Don't have an account?
        <router-link :to="{ name: 'Register' }">Sign up</router-link>
      </p>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  computed: {
    ...mapState(["baseUrl"]),
  },
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.loading = true;
      axios
        .post(`${this.baseUrl}login`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token_jwt", response.data.data);
          Swal.fire({
            title: "Success",
            icon: "success",
          }).then(() => {
            this.$router.push("/home");
            this.loading = false;
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Failed",
            text: error.response.data.message,
            icon: "error",
          }).then(() => {
            this.loading = false;
          });
        });
    },
    oauth() {
      window.location.href = `${this.baseUrl}oauth/google`;
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
