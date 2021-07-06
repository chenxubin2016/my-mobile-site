import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../views/Upload.vue")
  },
  {
    path: "/VideoUpload",
    name: "VideoUpload",
    component: () => import("../views/VideoUpload.vue")
  },
  {
    path: "/VideoPreview",
    name: "VideoPreview",
    component: () => import("../views/VideoPreview.vue")
  },
  {
    path: "/ShowCanvas",
    name: "ShowCanvas",
    component: () => import("../views/showCanvas.vue")
  },
  {
    path: "/Signature",
    name: "Signature",
    component: () => import("../views/Signature.vue")
  }
];

const router = new VueRouter({ routes });
router.addRoutes([{
  path: "/404",
  component: () => import("../views/View404.vue")
}]);
router.beforeEach((to, from, next) => {
  next();
});
export default router;
