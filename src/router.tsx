import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Layout from "./Layout";


import Home from "./modules/Auth/pages/Home";
import CollectionPage from "./modules/Auth/pages/CollectionPage";
import RestaurantMenuPage from "./modules/Auth/pages/RestaurantMenuPage";
import SearchDrawer from "./modules/Auth/pages/Search";
import CartPage from "./modules/Auth/pages/CartPage";

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const collectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collection/$id",
  component: CollectionPage,
});
const restaurantMenu = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurant/$id",
  component: RestaurantMenuPage,
});


const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchDrawer,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,collectionRoute,restaurantMenu,searchRoute,cartRoute
]);

export const router = createRouter({ routeTree });
