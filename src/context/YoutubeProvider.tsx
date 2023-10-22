import React from "react";
import { FakeYoutubeClient, YoutubeClient, Youtube } from "../api";
import { YoutubeApiContext } from "./YoutubeApiContext";

const youtubeClient = new FakeYoutubeClient();
// const youtubeClient = new YoutubeClient();

const youtube = new Youtube(youtubeClient);

export function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YoutubeApiContext.Provider value={youtube}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
