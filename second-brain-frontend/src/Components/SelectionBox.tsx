import type { ReactElement } from "react";

interface SelectionBoxProps {
    reference: React.RefObject<HTMLSelectElement | null>;
    SideIcon?: ReactElement;
}

export const SelectionBox = ({ SideIcon, reference }: SelectionBoxProps) => {
  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="px-2 py-2 relative flex justify-center items-center">
        <select ref={reference} required={true} className="w-full bg-transparent font-bold opacity-45  text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
          <option disabled={true} value="">Select Type</option>
          <option value="youtube">Youtube</option>
          <option value="twitter">Twitter</option>
          <option value="image">Image</option>
          <option value="link">Link</option>
          <option value="document">Document</option>
          <option value="document">Document</option>
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="other">Other</option>
        </select>
        {SideIcon}
      </div>
    </div>
  );
};
