
export interface ImageInfo {
  id: string;
  imageId: string;
  action: {
    link: string;
    text?: string;
    type?: string;
  };
  entityType: string;
  accessibility: {
    altText: string;
    altTextCta?: string;
  };
  entityId?: string;
 
  description?: string;
}

