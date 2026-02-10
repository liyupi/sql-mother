import { RouteRecordRaw } from "vue-router";

const IndexPage = () => import("../pages/IndexPage.vue");
const LevelsPage = () => import("../pages/LevelsPage.vue");
const PlaygroundPage = () => import("../pages/PlaygroundPage.vue");

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
