import { createRouter, createWebHistory } from "vue-router";

import NProgress from "nprogress";

import DashboardView from "@/views/backend/DashboardView.vue";

import SignIn3View from "@/views/auth/SignIn3View.vue";
import error400 from "@/views/errors/400View.vue";
import error401 from "@/views/errors/401View.vue";
import error403 from "@/views/errors/403View.vue";
import error404 from "@/views/errors/404View.vue";
import error500 from "@/views/errors/500View.vue";
import error503 from "@/views/errors/503View.vue";
import layoutSimple from "@/layouts/variations/Simple.vue";
import layoutsBackend from "@/layouts/variations/Backend.vue";
import BannersView from "@/views/backend/BannersView.vue";



const requireAuth = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    next(); // Redirect explicitly to "/"
  } else {
    next({ name: 'auth-signin3' }); // Allow access if token exists
  }
};


// Set all routes

const routes = [
  



  //dashboard routes
  {
    path: "/dashboard",
    component: layoutsBackend,
    children: [
      {
        path: "home",
        name: "dashboard",
        component: DashboardView,
        beforeEnter: requireAuth, // this is the guard
      },
      // tables (helpers) routes
      {
        path: "banner",
        name: "banners",
        component: BannersView,
        beforeEnter: requireAuth, // this is the guard
      },
    
    ],
  },

  //auth routes



  //  errors routes
  {
    path: "/errors",
    component: layoutSimple,
    children: [
      {
        path: "error400",
        name: "error400",
        component: error400,
      },
      {
        path: "error401",
        name: "400",
        component: error401,
      },

      {
        path: "error403",
        name: "403",
        component: error403,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: error404,
      },
      {
        path: "error500",
        name: "500",
        component: error500,
      },
      {
        path: "error503",
        name: "503",
        component: error503,
      },
    ],
  },
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // FIX: Ensure logout works correctly by checking token AFTER removal
  if (!token && from.name === "dashboard" && to.name === "auth-signin3") {
    next(); // Allow logout redirection to sign-in
  }
  // If user is logged in and tries to access the sign-in page, redirect to dashboard
  else if (token && to.name === "auth-signin3") {
    next({ name: "dashboard", replace: true });
  }
  // If user is not logged in and tries to access a dashboard route, redirect to sign-in
  else if (!token && to.path.startsWith("/dashboard")) {
    next({ name: "auth-signin3", replace: true });
  }
  else {
    next(); // Proceed as normal
  }
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });



router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
