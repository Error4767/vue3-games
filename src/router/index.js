import { createRouter, createWebHashHistory } from "vue-router";

import Index from "../views/Index.vue";

import MineSweeper from '../views/MineSweeper.vue';
import Tetris from '../views/Tetris.vue';
import Snake from '../views/Snake.vue';

const routes = [
  { path: "/", component: Index },
  { path: '/MineSweeper', component: MineSweeper },
  { path: '/Tetris', component: Tetris },
  { path: '/Snake', component: Snake },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;