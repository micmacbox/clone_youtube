import axios from "axios";
import { VideoSearchItem } from "../@types/video";

export default class FakeYoutube {
  constructor() {}

  async search(keyword?: string) {
    return keyword ? this.#searchByKeyword() : this.#mostPopular();
  }

  async #searchByKeyword() {
    return axios
      .get("/videos/search.json")
      .then((res) => res.data.items)
      .then((items) =>
        items.map((item: VideoSearchItem) => ({
          ...item,
          id: item.id.videoId,
        }))
      );
  }

  async #mostPopular() {
    return axios.get("/videos/popular.json").then((res) => res.data.items);
  }
}
