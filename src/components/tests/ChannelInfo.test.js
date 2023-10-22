import { render, screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import ChannelInfo from "../ChannelInfo";
import { withAllContexts, withRouter } from "../../test/utils";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };
  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    const { asFragment } = renderChannelInfoWithCallback(() => "url");

    await screen.findByRole("img");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without URL", () => {
    renderChannelInfoWithCallback(() => {
      throw new Error("error");
    });
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders with URL", async () => {
    renderChannelInfoWithCallback(() => "url");
    await screen.findByRole("img");
  });

  function renderChannelInfoWithCallback(callback) {
    fakeYoutube.channelImageURL.mockImplementation(callback);

    return render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );
  }
});
