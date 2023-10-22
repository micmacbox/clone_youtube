import { FC } from "react";
import { useLocation } from "react-router-dom";
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

const VideoDetail: FC = () => {
  const {
    state: {
      video: {
        id,
        snippet: { title, channelId, channelTitle, description },
      },
    },
  } = useLocation();

  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6">
        <iframe
          title={title}
          id="player"
          width="100%"
          height="640"
          src={`https://www.youtube.com/embed/${id}`}
        />
        <div className="p-8">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
      </article>
      <section className="basis-2/6">
        <RelatedVideos id={channelId} />
      </section>
    </section>
  );
};

export default VideoDetail;
