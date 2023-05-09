import * as THREE from "three";
// @ts-expect-error
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  // imageTargetSrc: "/src/darts.mind",
  imageTargetSrc:
    "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind",
  maxTrack: 1,
  filterMinCF: 0.01,
  filterBeta: 100,
  missTorelance: 8,
});
const { renderer, scene, camera } = mindarThree;
const video = document.getElementById("video") as HTMLVideoElement;
const anchor = mindarThree.addAnchor(0);
// 映像を投影するテクスチャを作成
const texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.format = THREE.RGBAFormat;
const material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
});
// 平面ジオメトリを作成して、テクスチャを貼り付ける
const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
anchor.group.add(mesh);

const start = async () => {
  await mindarThree.start();
  video.play();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};
const startButton = document.querySelector("#startButton");
startButton!.addEventListener("click", () => {
  start();
});
const stopButton = document.querySelector("#stopButton");
stopButton!.addEventListener("click", () => {
  mindarThree.stop();
  mindarThree.renderer.setAnimationLoop(null);
});
