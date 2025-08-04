import { useParams } from "@tanstack/react-router";
import type { MenuItem, RestaurantInfo } from "./restaurantMenuPage.types";
import { useRestaurantMenu } from "../../../components/Queries/useRestaurantMenu";
import Icon from "../../../components/Icons/Icon";

const RestaurantMenuPage = () => {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data, isLoading, error } = useRestaurantMenu(id);

  if (isLoading) return <div className="p-4">Loading menu...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading menu</div>;

  const restaurantInfo: RestaurantInfo | undefined = data?.data?.cards?.find(
    (card) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  )?.card?.card?.info;
  // console.log("restaurantInfo", restaurantInfo);

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
    <div className="p-4 max-w-6xl mx-auto">
      {restaurantInfo && (
        <div className="bg-white shadow rounded-xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{restaurantInfo.name}</h2>
            <p className="text-sm text-gray-600">
              {restaurantInfo.cuisines?.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              {restaurantInfo.locality}, {restaurantInfo.areaName}
            </p>
          </div>
          <div className="flex flex-col sm:items-end text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">
                {restaurantInfo.avgRatingString} <Icon name="star" size={10}/>
              </span>
              <span>({restaurantInfo.totalRatingsString})</span>
            </div>
            <div>{restaurantInfo.costForTwoMessage}</div>
            <div>{restaurantInfo.sla.slaString}</div>
          </div>
        </div>
      )}

      {categorizedItems.map((category) => (
        <div key={category.title} className="mb-10">
          <h3 className="text-xl font-bold mb-4">{category.title}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow hover:scale-[1.01] transition-transform"
              >
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  ₹{((item.price ?? item.defaultPrice ?? 0) / 100).toFixed(2)}
                </p>

                {item.description && (
                  <p className="text-xs text-gray-400">{item.description}</p>
                )}
                {item.imageId && (
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenuPage;
