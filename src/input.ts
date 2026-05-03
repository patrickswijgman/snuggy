import { cameraX, cameraY } from "./camera.js";
import { canvas, offsetX, offsetY, scaleX, scaleY } from "./canvas.js";

const inputs: Record<string, number> = Object.create(null);
const down = new Uint8Array(256);
const pressed = new Uint8Array(256);
const released = new Uint8Array(256);

export let pointerX = 0;
export let pointerY = 0;
export let pointerWorldX = 0;
export let pointerWorldY = 0;

export function setInput(code: string, input: number) {
  inputs[code] = input;
}

function updateInput(code: string, isDown: boolean) {
  const id = inputs[code];
  if (id === undefined) {
    return;
  }

  down[id] = isDown ? 1 : 0;
  pressed[id] = isDown ? 1 : 0;
  released[id] = isDown ? 0 : 1;
}

export function updateInputs() {
  updatePointerWorldPosition();
}

function updatePointerPosition(x: number, y: number) {
  pointerX = x / scaleX;
  pointerY = y / scaleY;
  updatePointerWorldPosition();
}

function updatePointerWorldPosition() {
  pointerWorldX = pointerX + cameraX;
  pointerWorldY = pointerY + cameraY;
}

export function resetInputs() {
  pressed.fill(0);
  released.fill(0);
}

export function isInputDown(id: number) {
  return down[id] === 1;
}

export function isInputPressed(id: number) {
  return pressed[id] === 1;
}

export function isInputReleased(id: number) {
  return released[id] === 1;
}

window.addEventListener("keydown", ({ code, repeat }) => {
  if (repeat) return;
  updateInput(code, true);
});

window.addEventListener("keyup", ({ code }) => {
  updateInput(code, false);
});

canvas.addEventListener("pointerdown", ({ clientX, clientY, button }) => {
  const x = clientX - offsetX;
  const y = clientY - offsetY;
  updatePointerPosition(x, y);
  updateInput(button.toString(), true);
});

canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
  const x = clientX - offsetX;
  const y = clientY - offsetY;
  updatePointerPosition(x, y);
  updateInput(button.toString(), false);
});

canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
  const x = clientX - offsetX;
  const y = clientY - offsetY;
  updatePointerPosition(x, y);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
