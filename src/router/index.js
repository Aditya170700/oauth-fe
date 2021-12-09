import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Oauth from "../views/Oauth.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      requiredWithoutAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiredWithoutAuth: true,
    },
  },
  {
    path: "/google/callback",
    name: "Oauth",
    component: Oauth,
    meta: {
      requiredWithoutAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  // mengecek ada tidak meta requiredWithoutAuth di dalam meta
  if (to.matched.some(record => record.meta.requiredWithoutAuth)) {
    if (localStorage.getItem('token_jwt') != null) {
      window.location.href = "/home";
    }
  }

  // mengecek ada tidak meta requiresAuth di dalam meta
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // cek di localstorage token, jika false maka diarahkan ke halaman login
    if (localStorage.getItem('token_jwt') == null) {
      window.location.href = "/";
    } else {
      // cek permission
      const decodeToken = jwt_decode(localStorage.getItem('token_jwt'));
      if (to.matched.some(record => record.meta.role)) {
        if (!to.meta.role.includes(decodeToken.user.role)) {
          window.location.href = "/forbidden";
        }
      }
    }
  }
  next();
});

export default router;
