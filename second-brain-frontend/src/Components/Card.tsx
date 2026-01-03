import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "Youtube" | "X";
}

export const Card = ({ title, link, type }: CardProps) => {
  const updatedLink = link.replace("watch","embed").replace("?v=","/")+"?si=z85OZlnVb0jjQt4B";
  console.log("updatedLink",updatedLink)
  return (
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-24 min-w-72">
      <div className="flex justify-between">
        <div className="flex text-md items-center">
          <div className="pr-2 text-gray-500">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <ShareIcon />
          </div>
          <div className="text-gray-500">
            <a href={link} target="_blank" />
            <ShareIcon />
          </div>
        </div>
      </div>
      <div className="pt-4">
        {type as string === "youtube" && (
          <iframe
            className="w-full"
            src={updatedLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}

        {type as string === "twitter" && (
          <blockquote className="twitter-tweet ">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};


// https://www.youtube.com/embed/Cg8vLb4Qkro?si=z85OZlnVb0jjQt4B
// https://www.youtube.com/watch?v=Cg8vLb4Qkro
// https://youtu.be/Cg8vLb4Qkro?si=Z1M46ecadzcgpmo8
// https://x.com/BillGates/status/1389316412259270657?s=20
