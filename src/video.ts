// @ts-expect-error
import Hls from "hls.js/dist/hls.min.js";

const video = document.getElementById("video") as HTMLVideoElement;
const videoUrl =
  "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8";
// const videoUrl = "/hls/test.m3u8";
if (Hls.isSupported()) {
  var hls = new Hls({ debug: true });
  hls.loadSource(videoUrl);
  hls.attachMedia(video);
  // hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //   video.play();
  //   // 背景透過を開始する
  //   timer();
  // });
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = videoUrl;
  // video.addEventListener("play", () => {
  //   // 背景透過を開始する
  //   timer();
  // });
  // video.addEventListener("canplay", () => {
  //   video.play();
  //   timer();
  // });
}

export const useCanvas = () => {
  const canvas = document.getElementById(
    "transparent-video"
  ) as HTMLCanvasElement;
  const canvasCtx = canvas.getContext("2d")!;

  const timer = () => {
    if (video.paused || video.ended) {
      return;
    }

    processChromaKey();
    setTimeout(() => {
      timer();
    }, 1);
  };
  const processChromaKey = () => {
    canvasCtx.drawImage(video, 0, 0, 640, 360);
    const frame = canvasCtx.getImageData(0, 0, 640, 360);
    const data = frame.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i + 0];
      const green = data[i + 1];
      const blue = data[i + 2];
      if (red < 100) {
        data[i + 3] = 0;
      }
    }
    canvasCtx.putImageData(frame, 0, 0);
  };

  return {
    timer,
  };
};
