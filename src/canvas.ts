import { getFont } from "./fonts.js";
import { getTexture } from "./textures.js";
import { toRadians } from "./utils.js";

export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d")!;

export let width: number;
export let height: number;
export let scale: number;

export let fontId: string;

export function setupCanvas(size: number) {
  width = size;
  height = size / (window.screen.width / window.screen.height);
  scale = window.screen.height / height;
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

export function resetTransform() {
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

export function translateTransform(x: number, y: number) {
  ctx.translate(x, y);
}

export function scaleTransform(x: number, y = x) {
  ctx.scale(x, y);
}

export function rotateTransform(degrees: number) {
  ctx.rotate(toRadians(degrees));
}

export function clearBackground() {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function setFont(id: string) {
  fontId = id;
}

export function drawTexture(textureId: string, x: number, y: number) {
  ctx.drawImage(getTexture(textureId), x, y);
}

export function drawSprite(textureId: string, x: number, y: number, w: number, h: number, pivotX: number, pivotY: number) {
  ctx.drawImage(getTexture(textureId), x, y, w, h, -pivotX, -pivotY, w, h);
}

export function drawText(text: string, x: number, y: number, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline) {
  ctx.font = getFont(fontId);
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function drawRect(x: number, y: number, w: number, h: number, color: string, filled: boolean) {
  if (filled) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

export function setAlpha(a: number) {
  ctx.globalAlpha = a;
}

export function getWidth() {
  return canvas.width / scale;
}

export function getHeight() {
  return canvas.height / scale;
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}
