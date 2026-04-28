import { icons } from "lucide-react";

export type IconName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  color?: string;
}

export function Icon({ name, color, size = 24, className, ...props }: IconProps) {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} {...props} />;
}
