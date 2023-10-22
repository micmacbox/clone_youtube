import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { withRouter } from "../../test/utils";
import { Route } from "react-router-dom";
import ChannelInfo from "../../components/ChannelInfo";
import RelatedVideos from "../../components/RelatedVideos";
import VideoDetail from "../VideoDetail";
import { fakeVideo } from "../../test";

jest.mock("../../components/ChannelInfo");
jest.mock("../../components/RelatedVideos");

describe("VideoDetail", () => {
  afterEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });

  it("renders video item details", () => {
    render(
      withRouter(<Route path="/" element={<VideoDetail />} />, {
        pathname: "/",
        state: { video: fakeVideo },
        key: "fake-key",
      })
    );
  });

  const { title, channelId, channelTitle } = fakeVideo.snippet;
  expect(screen.getByTitle(title)).toBeInTheDocument();
  expect(RelatedVideos.mock.calls[0][0]).toStricrtEqual({ id: fakeVideo.id });
  expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
    id: channelId,
    name: channelTitle,
  });
});
