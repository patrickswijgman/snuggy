import { height, translateTransform, width } from "./canvas.js";
import { delta } from "./loop.js";
import { clamp, getDistance } from "./utils.js";

export let cameraX = 0;
export let cameraY = 0;

export let cameraTargetX = 0;
export let cameraTargetY = 0;

export let cameraSmoothing = 1;

export let cameraBoundaryX = 0;
export let cameraBoundaryY = 0;
export let cameraBoundaryW = 0;
export let cameraBoundaryH = 0;

export function updateCamera() {
  const targetX = cameraTargetX - width / 2;
  const targetY = cameraTargetY - height / 2;

  if (cameraSmoothing >= 1) {
    cameraX = targetX;
    cameraY = targetY;
  } else {
    const dx = targetX - cameraX;
    const dy = targetY - cameraY;
    const d = getDistance(0, 0, dx, dy);
    const vx = dx * cameraSmoothing * delta;
    const vy = dy * cameraSmoothing * delta;
    const v = getDistance(0, 0, vx, vy);
    if (v > d) {
      cameraX += (vx / v) * d;
      cameraY += (vy / v) * d;
    } else {
      cameraX += vx;
      cameraY += vy;
    }
  }

  if (cameraBoundaryW && cameraBoundaryH) {
    cameraX = clamp(cameraX, cameraBoundaryX, cameraBoundaryW - width);
    cameraY = clamp(cameraY, cameraBoundaryY, cameraBoundaryH - height);
  }
}

export function addCameraTransform() {
  translateTransform(-cameraX, -cameraY);
}

export function setCameraPosition(x: number, y: number) {
  cameraX = x - width / 2;
  cameraY = y - height / 2;
}

export function setCameraTarget(x: number, y: number) {
  cameraTargetX = x;
  cameraTargetY = y;
}

export function setCameraSmoothing(value: number) {
  cameraSmoothing = value;
}

export function setCameraBoundary(x: number, y: number, w: number, h: number) {
  cameraBoundaryX = x;
  cameraBoundaryY = y;
  cameraBoundaryW = w;
  cameraBoundaryH = h;
}
