import { useParams, useSearch } from "@tanstack/react-router";
import { useCollection } from "../queries/useCollection";
import Spinner from "../components/Spinner";
import type { Restaurant } from "../components/Restaurants/restaurant.types";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";

type MastheadCard = {
  "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead";
  title: string;
  description: string;
  count: string;
};

type RestaurantCardType = {
  "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";
  info: Restaurant["info"];
};

type CardType = { card?: { card?: MastheadCard | RestaurantCardType } };


function isMastheadCard(card: any): card is { card: { card: MastheadCard } } {
  return card?.card?.card?.["@type"] ===
    "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead";
}

function isRestaurantCard(
  card: any
): card is { card: { card: RestaurantCardType } } {
  return card?.card?.card?.["@type"] ===
    "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";
}

const CollectionPage = () => {
  const { id } = useParams({ from: "/collection/$id" });
  const { search } = useSearch({ from: "/collection/$id" });

  const tags = search?.tags?.trim();
  const { data, isLoading, error } = useCollection(id, tags);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-red-500">Error loading collection data</p>
      </div>
    );
  }

  if (isLoading) return <Spinner />;

  const cards: CardType[] = data?.data?.cards ?? [];

  const masthead = cards.find(isMastheadCard)?.card?.card;

  const restaurants: Restaurant[] =
    cards.filter(isRestaurantCard).map((card) => ({
      info: card.card.card.info,
      cta: { link: "", type: "" }, 
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {masthead && (
        <div className="mb-6 -mt-10">
          <h1 className="text-4xl font-bold mb-5">{masthead.title}</h1>
          <p className="text-gray-600 font-bold mb-5">{masthead.description}</p>
          <p className="text-xl font-bold mb-2">{masthead.count} to explore</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {restaurants.map((rest) => (
          <RestaurantCard key={rest.info.id} rest={rest} variant="grid" />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
