import { lazy } from "react";

const routelist = [
  {
    path: "/register",
    component: lazy(async () => await import("../components/Register")),
  },
  {
    path: "/page-not-found",
    component: lazy(async () => await import("../pagenotfound/index")),
  },
  {
    path: "/profile",
    component: lazy(async () => await import("../components/Profile")),
  },
  {
    path: "/recovery",
    component: lazy(async () => await import("../components/Recovery")),
  },
  {
    path: "/reset",
    component: lazy(async () => await import("../components/Reset")),
  },
  {
    path: "/",
    component: lazy(async () => await import("../components/UserName")),
  },
  {
    path: "/password",
    component: lazy(async () => await import("../components/Password")),
  },
];

export default routelist;
