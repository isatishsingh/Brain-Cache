import { useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { SelectionBox } from "./SelectionBox";
import { DropdownIcon } from "../icons/DropdownIcon";

interface CreateContentModalProps {
  open: boolean;
  onClick: () => void;
}

export const CreateContentModal = ({
  open,
  onClick,
}: CreateContentModalProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const tags = tagsRef.current?.value;
    const link = linkRef.current?.value;
    const type = selectRef.current?.value || "";

    if (!title?.length || !tags?.length || !link?.length || !type?.length)
      return;

    await axios.post(
      `${BACKEND_URL}/content/api/v1/newContent`,
      {
        link,
        title,
        type,
        tags,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    onClick();
    alert("new Content added successfully");
  }

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="bg-white opacity-100 fixed p-4 rounded">
                <div className="flex justify-end">
                  <div className="cursor-pointer" onClick={onClick}>
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input placeHolder="Enter Title" reference={titleRef} />
                  <Input placeHolder="Enter Link" reference={linkRef} />
                  <SelectionBox
                    reference={selectRef}
                    SideIcon={<DropdownIcon />}
                  />
                  <Input placeHolder="Write tags" reference={tagsRef} />
                  <div className="flex justify-center">
                    <Button
                      onClick={addContent}
                      variant="primary"
                      text="Submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
