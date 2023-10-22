import axios, { AxiosInstance } from "axios";

export default class YoutubeClient {
  httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(params: any) {
    return this.httpClient.get("search", params);
  }

  async videos(params: any) {
    return this.httpClient.get("videos", params);
  }
}
