import { lazy } from "react";

const loadLoginPage = () =>
  import("./views/Login").then((module) => ({ default: module.LoginPage }));
const loadDashboardPage = () => import("./views/Dashboard/DashboardPage");
const loadDashboardHome = () => import("./views/Dashboard/DashboardHome");
const loadMasterHS = () => import("./views/Dashboard/MasterHS/MasterHSView");
const loadBC30 = () => import("./views/Dashboard/PEB/BC30View");
const loadBC25 = () => import("./views/Dashboard/TPB/BC25View");
const loadBC261 = () => import("./views/Dashboard/TPB/BC261View");
const loadBC262 = () => import("./views/Dashboard/TPB/BC262View");
const loadBC27Out = () => import("./views/Dashboard/TPB/BC27OutView");
const loadBC23Create = () => import("./views/Dashboard/TPB/BC23/Actions/Create");
const loadBC23List = () => import("./views/Dashboard/TPB/BC23/Actions/List");
const loadBC23Edit = () => import("./views/Dashboard/TPB/BC23/Actions/Edit");
const loadBC23View = () => import("./views/Dashboard/TPB/BC23/Actions/View");
const loadBC23ViewPosting = () => import("./views/Dashboard/TPB/BC23/Actions/ViewPosting");
const loadBC23Copy = () => import("./views/Dashboard/TPB/BC23/Actions/Copy");

export const LoginPage = lazy(loadLoginPage);
export const DashboardPage = lazy(loadDashboardPage);
export const DashboardHome = lazy(loadDashboardHome);
export const MasterHS = lazy(loadMasterHS);
export const BC30 = lazy(loadBC30);
export const BC25 = lazy(loadBC25);
export const BC261 = lazy(loadBC261);
export const BC262 = lazy(loadBC262);
export const BC27Out = lazy(loadBC27Out);
export const BC23CreateView = lazy(loadBC23Create);
export const BC23ListView = lazy(loadBC23List);
export const BC23EditView = lazy(loadBC23Edit);
export const BC23View = lazy(loadBC23View);
export const BC23ViewPosting = lazy(loadBC23ViewPosting);
export const BC23CopyView = lazy(loadBC23Copy);

const preloaders: Record<string, () => Promise<unknown>> = {
  "/login": loadLoginPage,
  "/dashboard": loadDashboardPage,
  "/dashboard/masterHS": loadMasterHS,
  "/dashboard/peb/bc30": loadBC30,
  "/dashboard/tpb/bc23": loadBC23List,
  "/dashboard/tpb/bc23/create": loadBC23Create,
  "/dashboard/tpb/bc23/edit": loadBC23Edit,
  "/dashboard/tpb/bc23/view": loadBC23View,
  "/dashboard/tpb/bc23/copy": loadBC23Copy,
  "/dashboard/tpb/bc23/view/posting": loadBC23ViewPosting,
  "/dashboard/tpb/bc25": loadBC25,
  "/dashboard/tpb/bc261": loadBC261,
  "/dashboard/tpb/bc262": loadBC262,
  "/dashboard/tpb/bc27out": loadBC27Out,
};

export const preloadRoute = (path: string) => {
  const preloader = preloaders[path];
  if (!preloader) return;

  void preloader().catch(() => {
    // Ignore preload failures; the route still loads on navigation.
  });
};
