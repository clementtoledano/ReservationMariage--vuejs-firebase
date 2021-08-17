import {createRouter, createWebHistory} from "vue-router";
import Accueil from "../views/Accueil.vue";

const routes = [
    {
        path: "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: '/register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/sign-in',
        component: () => import('../views/SignIn.vue')
    },
    {
        path: "/confirmation",
        name: "Confirmation",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Confirmation.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
