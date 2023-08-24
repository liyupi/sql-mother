import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import LevelsPage from "../pages/LevelsPage.vue";
import PlaygroundPage from "../pages/PlaygroundPage.vue";
import Page404 from "../pages/404Page.vue";

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
  {
    path: "/404",
    component: Page404,
  },
] as RouteRecordRaw[];
