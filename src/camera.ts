import { getHeight, getWidth, translateTransform } from "./canvas.js";
import { delta } from "./loop.js";
import { getDistance } from "./utils.js";

export let cameraX = 0;
export let cameraY = 0;
export let cameraSmoothing = 1;

export function updateCamera(x: number, y: number) {
  const targetX = x - getWidth() / 2;
  const targetY = y - getHeight() / 2;
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
}

export function addCameraTransform() {
  translateTransform(-cameraX, -cameraY);
}

export function setCameraPosition(x: number, y: number) {
  cameraX = x - getWidth() / 2;
  cameraY = y - getHeight() / 2;
}

export function setCameraSmoothing(value: number) {
  cameraSmoothing = value;
}
