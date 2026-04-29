import { getFont } from "./fonts.js";
import { getTexture } from "./textures.js";
import { toRadians } from "./utils.js";

export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d")!;

export let width: number;
export let height: number;
export let scaleX = 1;
export let scaleY = 1;
export let offsetX = 0;
export let offsetY = 0;

export let fontId: number;
export let fontOffsetX = 0;
export let fontOffsetY = 0;

export function setupCanvas(w: number, h: number) {
  width = w;
  height = h;
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

export function resetTransform() {
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
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

export function drawTexture(textureId: number, x: number, y: number) {
  ctx.drawImage(getTexture(textureId), x, y);
}

export function drawSprite(textureId: number, x: number, y: number, frameX: number, frameY: number, frameW: number, frameH: number) {
  ctx.drawImage(getTexture(textureId), frameX, frameY, frameW, frameH, x, y, frameW, frameH);
}

export function drawText(text: string, x: number, y: number, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline) {
  ctx.font = getFont(fontId);
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x + fontOffsetX, y + fontOffsetY);
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

export function setAlpha(value: number) {
  ctx.globalAlpha = value;
}

export function setFont(id: number) {
  fontId = id;
}

export function setFontOffset(x: number, y: number) {
  fontOffsetX = x;
  fontOffsetY = y;
}

function resize() {
  const r = width / height;

  let w = window.innerWidth;
  let h = w / r;
  if (h > window.innerHeight) {
    h = window.innerHeight;
    w = h * r;
  }

  scaleX = w / width;
  scaleY = h / height;

  canvas.width = w;
  canvas.height = h;

  const bounds = canvas.getBoundingClientRect();
  offsetX = bounds.left;
  offsetY = bounds.top;

  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}
