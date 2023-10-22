import React, { FC } from "react";
import { VideoInfo } from "../@types/video";
import { formatAgo } from "../util";
import { useNavigate } from "react-router-dom";
import { VideoType } from "../constants";

const VideoCard: FC<VideoInfo> = ({ video, type }) => {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const isRelatedList = type === VideoType.relatedVideos;
  const navigate = useNavigate();
  return (
    <li
      className={isRelatedList ? "flex gap-1 m-2" : ""}
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, { state: { video } });
      }}
    >
      <img
        className={isRelatedList ? "w-60 mr-2" : "w-full"}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className="font-semibold my-2 line-clamp-2">{title}</p>
        <p className="text-sm opacity-80"> {channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
};

export default VideoCard;
