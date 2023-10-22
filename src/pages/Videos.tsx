import { FC } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useQuery } from "@tanstack/react-query";
import { VideoItem } from "../@types/video";
import { FakeYoutube, Youtube } from "../api";

type Props = {};

const Videos: FC<Props> = ({}) => {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => {
      const youtube = new FakeYoutube();
      return youtube.search(keyword);
    },
  });
  return (
    <>
      <div>Videos {keyword ? `${keyword}` : `🔥`}</div>
      {isLoading && <p>loading...</p>}
      {error && <p>error occured 😰</p>}
      {videos && (
        <ul>
          {videos.map((video: VideoItem) => {
            return <VideoCard key={video.id} video={video} />;
          })}
        </ul>
      )}
    </>
  );
};

export default Videos;