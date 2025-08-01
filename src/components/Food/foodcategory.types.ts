export type ImageInfo = {
  id: string;
  imageId: string;
  action: {
    link: string;
    text: string;
    type: string;
  };
  accessibility: {
    altText: string;
  };
};