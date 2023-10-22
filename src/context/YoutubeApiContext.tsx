import React, { createContext, useContext } from "react";
import { FakeYoutubeClient, YoutubeClient, Youtube } from "../api";

const youtubeClient = new FakeYoutubeClient();
// const youtubeClient = new YoutubeClient();

const youtube = new Youtube(youtubeClient);
export const YoutubeApiContext = createContext({ youtube });

export function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
