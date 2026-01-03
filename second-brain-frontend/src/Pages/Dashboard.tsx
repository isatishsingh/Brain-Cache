import { useEffect, useState } from "react";
import { Button } from ".././Components/Button";
import { Card } from ".././Components/Card";
import { CreateContentModal } from ".././Components/CreateContentModal";
import { ShareIcon } from ".././icons/ShareIcon";
import { PlusIcon } from ".././icons/PlusIcon";
import { SideBar } from ".././Components/SideBar";
import { useContents } from "../hooks/useContent";

export const Dashboard = () => {
  const [open, isOpen] = useState(false);
  const { refresh, contents } = useContents();
  console.log(contents);

  useEffect(() => {
    refresh();
  }, [open]);

  return (
    <div>
      <SideBar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            text="Add content"
            StartIcon={<PlusIcon />}
            onClick={() => isOpen((e) => !e)}
          />
          <Button
            variant="secondary"
            text="Share brain"
            StartIcon={<ShareIcon />}
          />
        </div>
        <div className="flex gap-4 flex-wrap items-start">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
        <CreateContentModal open={open} onClick={() => isOpen((e) => !e)} />
      </div>
    </div>
  );
};

export default Dashboard;
