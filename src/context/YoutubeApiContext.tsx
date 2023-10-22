import { createContext, useContext } from "react";
import { Youtube } from "../api";

export const YoutubeApiContext = createContext<Youtube | null>(null);

export function useYoutubeApi() {
  const context = useContext(YoutubeApiContext);
  if (!context) throw new Error("youtubeContext is not initialized");
  return context;
}
