import { useParams } from "@tanstack/react-router";
import type { MenuItem, RestaurantInfo } from "./restaurantMenuPage.types";

import Spinner from "../../components/Spinner";
import MenuAccordion from "../../components/Accordion/Accordion";
import { useRestaurantMenu } from "../../Queries/useRestaurantMenu";
import RestaurantInfoCard from "../../components/RestaurantMenuCard/RestaurantMenuCard";

const RestaurantMenuPage = () => {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data, isLoading, error } = useRestaurantMenu(id);

  if (isLoading)
    return (
      <div className="p-4 text-center">
        <Spinner />
      </div>
    );
  if (error) return <div className="p-4 text-red-600">Error loading menu</div>;

  const restaurantInfo: RestaurantInfo | undefined = data?.data?.cards?.find(
    (card) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  )?.card?.card?.info;

  const regularCards =
    data?.data?.cards?.find((card) => card.groupedCard)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards || [];

  const categorizedItems: { title: string; items: MenuItem[] }[] = regularCards
    .filter(
      (card) =>
        card.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
        !!card.card.card.title
    )
    .map((category) => ({
      title: category.card.card.title as string,
      items: (category.card.card.itemCards || []).map(
        (itemCard) => itemCard.card.info
      ),
    }));

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {restaurantInfo && <RestaurantInfoCard restaurantInfo={restaurantInfo} />}

      <MenuAccordion categorizedItems={categorizedItems} />
    </div>
  );
};

export default RestaurantMenuPage;
