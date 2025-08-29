
export const truncate = (text: string, max: number, ellipsis = "...") => {
  if (!text) return "";
  if (text.length <= max) return text;
  const truncated = text.slice(0, max);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + ellipsis;
};
