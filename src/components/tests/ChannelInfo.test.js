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
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    const { asFragment } = render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );

    await screen.findByRole("img");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without URL", () => {
    fakeYoutube.channelImageURL.mockImplementation(() => {
      throw new Error("error");
    });

    render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );

    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders with URL", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );

    await screen.findByRole("img");
  });
});
