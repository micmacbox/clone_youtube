import axios, { AxiosInstance } from "axios";
import { VideoSearchItem } from "../@types/video";

export default class Youtube {
  httpClinet: AxiosInstance;
  constructor() {
    this.httpClinet = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword?: string) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword: string) {
    return this.httpClinet
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) =>
        items.map((item: VideoSearchItem) => ({
          ...item,
          id: item.id.videoId,
        }))
      );
  }

  async #mostPopular() {
    return this.httpClinet
      .get("videos", {
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
