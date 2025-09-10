import { useRef } from "react";
import Icon from "../Icons/Icon";
import type { HorizontalScrollCarouselProps } from "./horizontalScrollCarousel.types";
import Button from "../Button/Button";
import Shimmer from "../Shimmer/Shimmer";

const HorizontalScrollCarousel = <T,>({
  title,
  items,
  renderItem,
  loading = false,
}: HorizontalScrollCarouselProps<T>) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 px-4 pb-4 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Shimmer
            key={idx}
            className="flex-shrink-0 rounded-2xl"
            width={200}
            height={200}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative px-4 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>

        <div className="flex items-center gap-0">
          <Button
            onClick={() => scroll("left")}
            className="bg-white shadow-md p-2 rounded-full cursor-pointer"
          >
            <Icon name="left" size={18} />
          </Button>
          <Button
            onClick={() => scroll("right")}
            className="bg-white shadow-md p-2 rounded-full"
          >
            <Icon name="right" size={18} />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
      >
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;
