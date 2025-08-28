import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Layout from "./Layout";


import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import SearchDrawer from "./pages/Search";
import CartPage from "./pages/CartPage";
import HelpPage from "./pages/HelpPage";
import Offers from "./pages/Offers";
import SuccessPage from "./pages/SuccessPage";

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
const successRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/success",
  component: SuccessPage,
});
const HelpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: HelpPage,
});

const OffersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offers",
  component: Offers,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,collectionRoute,restaurantMenu,searchRoute,cartRoute,HelpRoute,OffersRoute,successRoute
]);

export const router = createRouter({ routeTree });
