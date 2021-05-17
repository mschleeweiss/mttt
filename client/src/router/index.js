import { createWebHistory, createRouter } from "vue-router";
import Game from "@/components/Game.vue";
import Home from "@/components/Home.vue";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/join/:gameid",
        component: Game,
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});