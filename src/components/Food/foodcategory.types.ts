// export type ImageInfo = {
//   id: string;
//   imageId: string;
//   action: {
//     link: string;
//     text: string;
//     type: string;
//   };
//   accessibility: {
//     altText: string;
//   };
// };


// Define ImageInfo interface directly in this file
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
  frequencyCapping?: any;
  externalMarketing?: any;
  description?: string;
}

// interface CategoryResponse {
//   data: {
//     cards: Array<{
//       card: {
//         card: {
//           "@type": string;
//           imageGridCards?: {
//             info: ImageInfo[];
//           };
//         };
//       };
//     }>;
//   };
// }
