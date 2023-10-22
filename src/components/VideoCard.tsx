import React, { FC } from "react";
import { VideoItem } from "../@types/video";

type Props = { video: VideoItem };

const VideoCard: FC<Props> = ({ video }) => {
  return <div>{video.snippet.title}</div>;
};

export default VideoCard;
