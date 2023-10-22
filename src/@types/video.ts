import { VideoType } from "../constants";

export type VideoId = {
  kind: string;
  videoId: string;
};

export type VideoImg = {
  url: string;
  width: number;
  height: number;
};

export type VideoThumbnails = {
  default: VideoImg;
  medium: VideoImg;
  high: VideoImg;
};

export type VideoSnippet = {
  title: string;
  thumbnails: VideoThumbnails;
  channelTitle: string;
  publishedAt: string;
};

export type VideoItem = {
  id: string;
  snippet: VideoSnippet;
};

export type VideoSearchItem = {
  id: VideoId;
  snippet: VideoSnippet;
};

export type VideoInfo = {
  video: VideoItem;
  type?: VideoType;
};
