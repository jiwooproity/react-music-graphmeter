import React from "react";
import { MainStyle as CSS } from "style";

const Background = (props) => {
  const { image } = props;

  return (
    <>
      <CSS.BackDropBackground />
      <CSS.BackDropWallpaper src={image} />
    </>
  );
};

export default Background;
