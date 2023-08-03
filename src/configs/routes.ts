import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import LevelsPage from "../pages/LevelsPage.vue";
import PlaygroundPage from "../pages/PlaygroundPage.vue";

/**
 * 路由列表
 */
export default [
  {
    path: "/",
    component: IndexPage,
    redirect: "/learn",
    props: true,
  },
  {
    path: "/learn/:levelKey?",
    component: IndexPage,
    props: true,
  },
  {
    path: "/levels",
    component: LevelsPage,
  },
  {
    path: "/playground",
    component: PlaygroundPage,
  },
] as RouteRecordRaw[];
