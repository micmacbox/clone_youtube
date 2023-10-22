import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import VideoCard from "./VideoCard";
import { VideoItem } from "../@types/video";

type Props = {
  id: string;
};

const RelatedVideos: FC<Props> = ({ id }) => {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["channel", id],
    queryFn: () => youtube.channelVideos(id),
  });
  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>error occured 😰</p>}
      {videos && (
        <ul>
          {videos.map((video: VideoItem) => (
            <VideoCard key={video.id} video={video} type="list" />
          ))}
        </ul>
      )}
    </>
  );
};

export default RelatedVideos;
