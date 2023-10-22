import { render, screen, waitFor } from "@testing-library/react";
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
    render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );

    await waitFor(() => screen.findByText("channel"));
  });
});
