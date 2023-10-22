import React, { FC } from "react";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
  name: string;
};

const ChannelInfo: FC<Props> = ({ id, name }) => {
  const youtube = useYoutubeApi();
  const { data: url } = useQuery({
    queryKey: ["channelImage", id],
    queryFn: () => youtube.channelImageURL(id),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="flex my-4 mb-8 items-center">
      {url && <img className="w-10 h-10 rounded-full" src={url} alt={name} />}
      <p className="text-lg font-medium ml-2">{name}</p>
    </div>
  );
};

export default ChannelInfo;
