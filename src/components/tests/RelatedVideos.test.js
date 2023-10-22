import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Route } from "react-router-dom";
import { fakeVideos } from "../../test";
import { withAllContexts, withRouter } from "../../test/utils";
import RelatedVideos from "../RelatedVideos";

describe("RelatedVideos", () => {
  const fakeYoutube = {
    channelVideos: jest.fn(),
  };

  afterEach(fakeYoutube.channelVideos.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelVideos.mockImplementation(() => fakeVideos);
    const { asFragment } = renderRelatedVideos();

    await waitForElementToBeRemoved(screen.getByText("loading..."));
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders related videos correctly", async () => {
    fakeYoutube.channelVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    expect(fakeYoutube.channelVideos).toHaveBeenCalledWith("id");
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length)
    );
  });

  it("renders error", async () => {
    fakeYoutube.channelVideos.mockImplementation(() => {
      throw new Error("error");
    });

    renderRelatedVideos();
    await waitFor(() => {
      expect(screen.getByText("error occured 😰")).toBeInTheDocument();
    });
  });

  it("renders loading", () => {
    fakeYoutube.channelVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  function renderRelatedVideos() {
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );
  }
});
