import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import Layout from "./Layout";

const Home = lazyRouteComponent(() => import("./pages/Home"));
const CollectionPage = lazyRouteComponent(() => import("./pages/CollectionPage/CollectionPage"));
const RestaurantMenuPage = lazyRouteComponent(() => import("./pages/RestaurantMenuPage/RestaurantMenuPage"));
const SearchDrawer = lazyRouteComponent(() => import("./pages/Search/Search"));
const CartPage = lazyRouteComponent(() => import("./pages/CartPage"));
const SuccessPage = lazyRouteComponent(() => import("./pages/SuccessPage"));
const HelpPage = lazyRouteComponent(() => import("./pages/HelpPage"));
const Offers = lazyRouteComponent(() => import("./pages/Offers"));

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
  homeRoute,
  collectionRoute,
  restaurantMenu,
  searchRoute,
  cartRoute,
  HelpRoute,
  OffersRoute,
  successRoute,
]);

export const router = createRouter({ routeTree });
