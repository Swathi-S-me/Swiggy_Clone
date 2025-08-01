import { useRef } from "react";
import Icon from "../Icons/Icon";
import type { HorizontalScrollCarouselProps } from "./horizontalScrollCarousel.types";
import Button from "../Button/Button";



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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <Button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
      >
        <Icon name="left" size={18} />
      </Button>

      <Button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
      >
        <Icon name="right" size={18} />
      </Button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
      >
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;
