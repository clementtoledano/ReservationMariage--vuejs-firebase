import { nextTick } from "vue-demi";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/",
        name: "Accueil",
        component: () => import("../views/Accueil.vue"),
      },
      {
        path: "/register",
        component: () => import("../views/Register.vue"),
      },
      {
        path: "/sign-in",
        component: () => import("../views/SignIn.vue"),
      },
      {
        path: "/confirmation",
        name: "Confirmation",
        component: () => import("../views/Confirmation.vue"),
        beforeEnter: () => {
          if (localStorage.userEmail === "undefined") {
            alert(
              "il faut vous connecter pour pouvoir confirmer votre présence"
            );
            router.replace('/')
          }
        },
      },
      {
        path: "/contact",
        name: "Contact",
        component: () => import("../views/Contact.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
