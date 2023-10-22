import { VideoSearchItem } from "../@types/video";
import { FakeYoutubeClient, YoutubeClient } from "./index";

export default class Youtube {
  apiClient: FakeYoutubeClient | YoutubeClient;

  constructor(apiClient: FakeYoutubeClient | YoutubeClient) {
    this.apiClient = apiClient;
  }

  async search(keyword?: string) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword: string) {
    return this.apiClient
      .search({
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
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
