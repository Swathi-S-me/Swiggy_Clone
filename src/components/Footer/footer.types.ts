export type City = {
  text: string;
  link: string;
};
export interface FooterCard {
  card: {
    card: {
      ["@type"]: string;
      cities?: City[];
    };
  };
}