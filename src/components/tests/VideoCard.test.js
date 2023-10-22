import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route, MemoryRouter, useLocation } from "react-router-dom";
import { formatAgo } from "../../util";
import VideoCard from "../VideoCard";

describe("VideoCard", () => {
  const video = {
    id: "LcKoyrvqE4I",
    snippet: {
      publishedAt: "2023-10-17T21:28:40Z",
      channelId: "UCooTLkxcpnTNx6vfOovfBFA",
      title: "England vs. Italy Highlights | European Qualifiers",
      description:
        "Check out the Highlights as England took on Italy in the European Qualifiers.\n\n#FOXSoccer #Soccer #EnglandVsItaly \n\nSUBSCRIBE to get the latest FOX Soccer content: http://foxs.pt/SubscribeFOXSOCCER\nThe all-new FOX Sports App, built for the modern sports fan: https://tinyurl.com/y4uouolb\n\n►FOX Sports YouTube Channel: http://foxs.pt/SubscribeFOXSPORTS\n►PBC ON FOX’s YouTube Channel: https://foxs.pt/SubscribePBCONFOX\n►WWE ON FOX YouTube channel: https://foxs.pt/SubscribeWWEONFOX\n►NASCAR ON FOX YouTube channel: https://foxs.pt/SubscribeNASCARonFOX\n►CFB ON FOX YouTube channel: https://foxs.pt/SubscribeCFBonFOX\n\nSee more from FOX Soccer: https://foxs.pt/FOXSoccer\nLike FOX Soccer on Facebook: https://foxs.pt/FOXSoccerFacebook\nFollow FOX Soccer on Twitter: https://foxs.pt/FOXSoccerTwitter\nFollow FOX Soccer on Instagram: https://foxs.pt/FOXSoccerInstagram\n\nAbout FOX Soccer:\nWith exclusive highlights, original programming, and behind the scenes footage, FOX Soccer’s YouTube channel provides the sports content that fans are hungry for. FOX Soccer presents: Bundesliga, MLS, FIFA World Cup, FIFA Women’s World Cup, Copa America, Gold Cup and many more.\n\nEngland vs. Italy Highlights | European Qualifiers\nhttps://youtu.be/LcKoyrvqE4I\n\nFOX Soccer\nhttps://www.youtube.com/user/Foxsoccer",
      thumbnails: {
        medium: {
          url: "https://i.ytimg.com/vi/LcKoyrvqE4I/mqdefault.jpg",
          width: 320,
          height: 180,
        },
      },
      channelTitle: "TUDN USA",
    },
  };
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;
  it("renders video item", () => {
    render(
      <MemoryRouter>
        <VideoCard video={video} />
      </MemoryRouter>
    );

    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("navigates to detail video page with video state when cliicked", () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </Routes>
      </MemoryRouter>
    );

    const card = screen.getByRole("listitem");
    userEvent.click(card);
    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
