import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export const SideBar = () => {
  return (
    <div className="h-screen w-72 bg-white fixed left-0 top-0 border-r pl-6">
      <div className="flex text-2xl font-bold pt-8 items-center text-gray-700">
        <div className="pr-2 text-purple-600">
          <BrainIcon />
        </div>
        <div>Second Brain</div>
      </div>
      <div className="pt-8 pl-4">
        <SideBarItem text="Twitter" SideIcon={<TwitterIcon />} />
        <SideBarItem text="Youtube" SideIcon={<YoutubeIcon />} />
      </div>
    </div>
  );
};
