import { render, screen, waitFor } from "@testing-library/react";
import { fakeVideo, fakeVideos } from "../../test";
import { withAllContexts, withRouter } from "../../test/utils";
import { Route } from "react-router-dom";
import Videos from "../Videos";

describe("Videos component", () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    fakeYoutube.search.mockImplementationa((keyword) => {
      return keyword ? [fakeVideo] : fakeVideos;
    });
  });

  afterEach(() => {
    fakeYoutube.search.mockReset();
  });

  it("renders all videos when keyword is not specified", async () => {
    renderWithPath("/");

    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined);
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length)
    );
  });

  it("when keyword is specified, renders search results", async () => {
    const searchKeyword = "fake-keyword";
    fenderWithPath(`/${searchKeyword}`);

    expect(fakeYoutube.search).toHaveBeenCalledWith(searchKeyword);
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(1)
    );
  });

  it("renders loading state when items are being fetched", async () => {
    renderWithPath("/");

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders error state when fetching item fails", async () => {
    fakeYoutube.search.mockImplementation(async () => {
      throw new Error("error");
    });

    renderWithPath("/");

    await waitFor(() => {
      expect(screen.getByText(/Something is wrong/i)).toBeInTheDocument();
    });
  });

  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />
          </>
        )
      )
    );
  }
});
