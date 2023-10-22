export type VideoId = {
  kind: string;
  videoId: string;
};

export type VideoSnippet = {
  title: string;
};

export type VideoItem = {
  id: string;
  snippet: VideoSnippet;
};

export type VideoSearchItem = {
  id: VideoId;
  snippet: VideoSnippet;
};
