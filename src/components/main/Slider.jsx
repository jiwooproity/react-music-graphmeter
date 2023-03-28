import React, { forwardRef } from "react";
import { MainStyle as CSS } from "style";

// ref 전달을 받기 위한 forwardRef 선언
const Slider = forwardRef((props, forwardedRef) => {
  const { image } = props;
  const { onChange } = props;

  return (
    <CSS.AlbumSliderWrapper >
      <CSS.AudioInput type="file" id="fileUpload" onChange={onChange} hidden={true} />
      <label htmlFor="fileUpload">
        <CSS.AlbumCover id="album" src={image} ref={forwardedRef}/>
      </label>
    </CSS.AlbumSliderWrapper>
  );
});

export default Slider;
