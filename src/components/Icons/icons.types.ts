import type { icons } from "./Icon";

export type IconName = keyof typeof icons;


export type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};