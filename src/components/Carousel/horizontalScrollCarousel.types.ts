export interface HorizontalScrollCarouselProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loading?: boolean;
}