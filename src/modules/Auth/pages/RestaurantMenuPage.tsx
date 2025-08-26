import { useParams } from "@tanstack/react-router";
import type { MenuItem, RestaurantInfo } from "./restaurantMenuPage.types";
import { useRestaurantMenu } from "../../../components/Queries/useRestaurantMenu";
import Icon from "../../../components/Icons/Icon";
import Spinner from "../../../components/Spinner";
import MenuAccordion from "../../../components/Accordion/Accordion";


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
      {restaurantInfo && (
        <div className="bg-white shadow rounded-xl p-6 mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {restaurantInfo.name}
            </h2>

            <div className="flex items-center gap-4 text-sm text-gray-700">
              <span className="text-green-600 font-semibold flex items-center gap-1">
                {restaurantInfo.avgRatingString}
                <Icon name="star" size={12} />
              </span>
              <span className="text-gray-700 font-bold">
                ({restaurantInfo.totalRatingsString})
              </span>
              <span className="text-gray-700 font-bold">
                {restaurantInfo.costForTwoMessage}
              </span>
            </div>

            <p className="text-sm text-orange-500 font-bold">
              {restaurantInfo.cuisines?.join(", ")}
            </p>
            <p className="text-sm text-gray-700 font-bold">
              Outlet: {restaurantInfo.locality}, {restaurantInfo.areaName}
            </p>
            <span className="text-gray-700 font-bold">
              {restaurantInfo.sla.slaString}
            </span>
          </div>
        </div>
      )}


      <MenuAccordion categorizedItems={categorizedItems}/>
    </div>
  );
};

export default RestaurantMenuPage;
