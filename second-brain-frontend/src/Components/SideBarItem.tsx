import type { ReactElement } from "react";

interface SideBarItemProps {
  SideIcon?: ReactElement;
  text: string;
}

export const SideBarItem = ({ SideIcon, text }: SideBarItemProps) => {
  return (
    <div className="flex text-gray-700 p-2 cursor-pointer hover:bg-gray-100 rounded  max-w-48 pl-4">
      <div className="pr-2">{SideIcon}</div>
      <div>{text}</div>
    </div>
  );
};
