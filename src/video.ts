// @ts-expect-error
import Hls from "hls.js/dist/hls.min.js";

const video = document.getElementById("video") as HTMLMediaElement;
const config = {
  manifestLoadingTimeOut: 2000, // マスターマニフェストのタイムアウト(ミリ秒)
  manifestLoadingMaxRetry: 10, // マスターマニフェストを何回リトライするか
  manifestLoadingMaxRetryTimeout: 3000, // タイムアウトしたあとリトライするまでの最大待機時間(ミリ秒)
  levelLoadingTimeOut: 2000, // レベルマニフェストのタイムアウト(ミリ秒)
  levelLoadingMaxRetry: 10, // レベルマニフェストを何回リトライするか
  levelLoadingMaxRetryTimeout: 2000, // タイムアウトしたあとリトライするまでの最大待機時間(ミリ秒)
  fragLoadingTimeOut: 2000, // 動画データのタイムアウト(ミリ秒)
  fragLoadingMaxRetry: 10, // 動画データを何回リトライするか
  fragLoadingMaxRetryTimeout: 2000, // 動画データがタイムアウトしたあとリトライするまでの最大待機時間(ミリ秒)
  liveBackBufferLength: 0, // 再生し終わったデータを保持する長さ(秒)
  debug: true,
};

const videoUrl =
  "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8";
if (Hls.isSupported()) {
  var hls = new Hls(config);
  hls.loadSource(videoUrl);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = videoUrl;
  video.addEventListener("canplay", () => {
    video.play();
  });
}
