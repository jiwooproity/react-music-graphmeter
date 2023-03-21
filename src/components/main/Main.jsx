import React, { useEffect, useRef, useState } from "react";
import { MainStyle as CSS } from "style";

import albumCover from "../../images/cover.png";
// import radioactive from "../../music/Imagine Dragons-01-Radioactive.flac";
import Background from "./Background";
import Slider from "./Slider";

let barHeight = 0;

let bigBars = 0;
let r = 0;
let g = 0;
let b = 255;
let a = 0;
let x = 0;

let WIDTH = 0;
let HEIGHT = 0;

const INTERVAL = 128; // 128, 256
const SAMPLES = 4096; // 4096, 1024, 512, 2048

const Main = () => {
  const visualizerRef = useRef();
  const visualizerRef2 = useRef();
  const effectRef = useRef();
  const imageRef = useRef();

  // const [audio, setAudio] = useState(null);
  const [freqArr, setFreqArr] = useState([]);
  const [analyser, setAnalyser] = useState(null);

  const [visualizerContext, setVisualizerContext] = useState(null);
  const [visualizerContext2, setVisualizerContext2] = useState(null);
  const [effectContext, setEffectContext] = useState(null);
  const [audioContext, setAudioContext] = useState(null);

  const [audioUrl, setAudioUrl] = useState("");
  const [audioThumbail, setAudioThumbnail] = useState(albumCover);

  const initDraw = () => {
    visualizerContext.clearRect(0, 0, WIDTH, HEIGHT);
    visualizerContext2.clearRect(0, 0, WIDTH, HEIGHT);

    r = 80;
    g = 20;
    b = 220;
    a = 1;
    x = 0;

    for (let i = 0; i < INTERVAL; i++) {
      r = r + 10;
      if (r > 255) {
        r = 255;
      }
      g = g + 1;
      if (g > 255) {
        g = 255;
      }
      b = b - 2;
      if (b < 0) {
        b = 0;
      }
      a = a - 0.005;
      if (a < 0) {
        a = 0;
      }

      // 메인
      visualizerContext.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + a + ")";
      visualizerContext2.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + a + ")";
      // visualizerContext.fillStyle = "rgb(255, 255, 255)";
      visualizerContext.fillRect(x, HEIGHT / 2 - 2, WIDTH / INTERVAL - 1, 2);
      visualizerContext2.fillRect(x, HEIGHT / 2 - 2, WIDTH / INTERVAL - 1, 2);

      // 그림자
      visualizerContext.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.2)";
      visualizerContext2.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.2)";
      // visualizerContext.fillStyle = "rgba(255, 255, 255, 0.1)";
      visualizerContext.fillRect(x, HEIGHT / 2, WIDTH / INTERVAL - 1, 2);
      visualizerContext2.fillRect(x, HEIGHT / 2, WIDTH / INTERVAL - 1, 2);

      x = x + WIDTH / INTERVAL;
    }
  };

  const effectDraw = () => {
    imageRef.current.style.width = "410px";
    imageRef.current.style.height = "410px";
    imageRef.current.style.opacity = "1";

    let gradient = effectContext.createRadialGradient(
      window.innerWidth / 2,
      window.innerHeight / 2,
      800 - bigBars * 100,
      window.innerWidth / 2,
      window.innerHeight / 2,
      2400
    );

    gradient.addColorStop(1, "rgba(46, 46, 111, 0.8)");
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.02)");

    effectContext.fillStyle = gradient;
    effectContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const visualizerDraw = () => {
    effectContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    imageRef.current.style.width = "400px";
    imageRef.current.style.height = "400px";
    imageRef.current.style.opacity = "0.9";

    bigBars = 0;
    r = 80;
    g = 20;
    b = 220;
    a = 1;
    x = 0;

    visualizerContext.clearRect(0, 0, WIDTH, HEIGHT);
    visualizerContext2.clearRect(0, 0, WIDTH, HEIGHT);
    analyser.getByteFrequencyData(freqArr);

    for (let i = 0; i < INTERVAL; i++) {
      let num = i;

      if ((i >= 5 && i <= 7 && barHeight >= 210) || (i >= 3 && i <= 4 && barHeight >= 180)) {
        bigBars++;
      }

      barHeight = (freqArr[num] - 128) * 2 + 2;

      if (barHeight <= 1) {
        barHeight = 2;
      }

      r = r + 10;
      if (r > 255) {
        r = 255;
      }

      g = g + 1;
      if (g > 255) {
        g = 255;
      }

      b = b - 2;
      if (b < 0) {
        b = 0;
      }

      a = a - 0.005;
      if (a < 0) {
        a = 0;
      }

      // 메인
      visualizerContext.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + a + ")";
      visualizerContext2.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + a + ")";
      // visualizerContext.fillStyle = "rgb(255, 255, 255)";
      visualizerContext.fillRect(WIDTH - x, HEIGHT / 2 - barHeight, WIDTH / INTERVAL - 2, barHeight);
      visualizerContext2.fillRect(WIDTH - x, HEIGHT / 2 - barHeight, WIDTH / INTERVAL - 2, barHeight);

      // 그림자
      visualizerContext.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.2)";
      visualizerContext2.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.2)";
      // visualizerContext.fillStyle = "rgba(255, 255, 255, 0.1)";
      visualizerContext.fillRect(WIDTH - x, HEIGHT / 2, WIDTH / INTERVAL - 2, barHeight);
      visualizerContext2.fillRect(WIDTH - x, HEIGHT / 2, WIDTH / INTERVAL - 2, barHeight);

      x = x + WIDTH / INTERVAL;
    }

    if (bigBars >= 1) effectDraw();

    requestAnimationFrame(visualizerDraw);
  };

  useEffect(() => {
    if (visualizerContext) {
      const visualizerCanvas = visualizerContext.canvas;

      WIDTH = visualizerCanvas.width;
      HEIGHT = visualizerCanvas.height;
      barHeight = HEIGHT;

      let audio = document.getElementById("audio");
      audio.volume = 0.3;

      let audioContext = new AudioContext();
      let analyser = audioContext.createAnalyser();
      analyser.fftSize = SAMPLES;

      let oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);

      let source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      source.connect(audioContext.destination);

      let freqArr = new Uint8Array(analyser.frequencyBinCount);

      setAudioUrl(audio);
      setFreqArr(freqArr);
      setVisualizerContext(visualizerContext);
      setAnalyser(analyser);
      setAudioContext(audioContext);
      initDraw();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualizerContext]);

  useEffect(() => {
    const visualizerCanvas = visualizerRef.current;
    const visualizerContext = visualizerCanvas.getContext("2d");
    visualizerCanvas.width = 700;
    visualizerCanvas.height = 600;

    const visualizerCanvas2 = visualizerRef2.current;
    const visualizerContext2 = visualizerCanvas2.getContext("2d");
    visualizerCanvas2.width = 700;
    visualizerCanvas2.height = 600;

    const effectCanvas = effectRef.current;
    const effectContext = effectCanvas.getContext("2d");
    effectCanvas.width = window.innerWidth;
    effectCanvas.height = window.innerHeight;

    setVisualizerContext(visualizerContext);
    setVisualizerContext2(visualizerContext2);
    setEffectContext(effectContext);
  }, [visualizerRef, effectRef]);

  const onAudioChange = (e) => {
    let audio = document.getElementById("audio");

    let render = new FileReader();
    render.onload = (e) => {
      audio.src = e.target.result;
      audio.crossOrigin = "anonymous";

      audio.play();
      audioContext.resume();
    };

    render.readAsDataURL(e.target.files[0]);
    requestAnimationFrame(visualizerDraw);
  };

  const onPlaying = () => {
    audioContext.resume();
    requestAnimationFrame(visualizerDraw);
  };

  const onKeyDown = async ({ key, target }) => {
    const { value } = target;

    if (key === "Enter") {
      let audio = document.getElementById("audio");
      audio.pause();

      const { thumbnail } = await fetch(`http://localhost:8080/stream?url=${value}`).then((res) => res.json());
      setAudioThumbnail(thumbnail.url);
      await fetch(`http://localhost:8080/play?url=${value}`)
        .then((res) => res.blob())
        .then((data) => {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          setAudioUrl(window.URL.createObjectURL(data));
        });
    }
  };

  useEffect(() => {
    if (audioUrl) {
      let audio = document.getElementById("audio");
      audio.play();
      onPlaying();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  const resizing = () => {
    // const visualizerCanvas = visualizerRef.current;
    // const visualizerContext = visualizerCanvas.getContext("2d");
    // visualizerCanvas.width = window.innerWidth - 100;
    // visualizerCanvas.height = window.innerHeight - 100;

    const effectCanvas = effectRef.current;
    const effectContext = effectCanvas.getContext("2d");
    effectCanvas.width = window.innerWidth;
    effectCanvas.height = window.innerHeight;

    // WIDTH = visualizerContext.canvas.width;
    // HEIGHT = visualizerContext.canvas.height;
    // barHeight = HEIGHT;

    // setVisualizerContext(visualizerContext);
    setEffectContext(effectContext);
  };

  useEffect(() => {
    window.addEventListener("resize", resizing);
  });

  return (
    <CSS.Container>
      <Background image={audioThumbail} />
      <Slider image={audioThumbail} onChange={onAudioChange} ref={imageRef} />
      <CSS.EffectCanvas id="effect" ref={effectRef} />
      <CSS.AudioController src={audioUrl} id="audio" crossorigin="anonymous" controls onPlay={onPlaying} />
      <CSS.VisualizerCanvas id="visualizer" ref={visualizerRef} align={true} />
      <CSS.VisualizerCanvas id="visualizer" ref={visualizerRef2} align={false} />
      <CSS.YoutubeURLInput type="text" placeholder="듣고 싶은 유튜브 영상 주소를 입력해주세요." onKeyDown={onKeyDown} />
    </CSS.Container>
  );
};

export default Main;
