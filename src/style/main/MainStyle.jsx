import styled, { css } from "styled-components";

const MainStyle = {};

MainStyle.Container = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 1920px;

  padding: 0px 50px 0px 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

MainStyle.BackDropWallpaper = styled.img`
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;
`;

MainStyle.BackDropBackground = styled.div`
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);

  z-index: 1;
`;

MainStyle.EffectCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 2;
`;

MainStyle.VisualizerCanvas = styled.canvas`
  z-index: 6;

  position: absolute;

  ${({ align }) =>
    align
      ? css`
          top: 50%;
          left: 50px;
          transform: translateY(-50%);
        `
      : css`
          top: 50%;
          right: 50px;
          transform: translateY(-50%) scaleX(-1);
        `}
`;

MainStyle.AudioInput = styled.input`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 5;
`;

MainStyle.AudioController = styled.audio`
  position: absolute;
  top: 80%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 5;

  outline: none;

  opacity: 0;

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.2s ease;
`;

MainStyle.AlbumCover = styled.img`
  width: 400px;
  height: 400px;

  display: block;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  color: rgba(255, 255, 255, 0.8);
  border: currentColor 0.1em solid;
  border-radius: 0.25em;

  object-fit: cover;

  cursor: pointer;

  z-index: 3;

  box-shadow: 0 0 1.1em rgba(255, 154, 96, 0.5);
  opacity: 0.9;

  transition: all 0.1s ease;
`;

export default MainStyle;
