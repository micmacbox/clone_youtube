import React, { FC } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const Videos: FC<Props> = ({}) => {
  const { keyword } = useParams();
  return <div>Videos {keyword ? `${keyword}` : `🔥`}</div>;
};

export default Videos;
