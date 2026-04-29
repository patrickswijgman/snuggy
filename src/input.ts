import { cameraX, cameraY } from "./camera.js";
import { canvas, scaleX, scaleY } from "./canvas.js";

export type InputMap = Record<string, number>;

let inputMap: InputMap = Object.create(null);

const down = new Uint8Array(256);
const pressed = new Uint8Array(256);
const released = new Uint8Array(256);

export let pointerX = 0;
export let pointerY = 0;
export let pointerWorldX = 0;
export let pointerWorldY = 0;

export function setupInput(map: InputMap) {
  inputMap = map;
}

export function updateInputs() {
  updatePointerWorldPosition();
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

function setInput(code: string, isDown: boolean) {
  const id = inputMap[code];
  if (id === undefined) {
    return;
  }

  down[id] = isDown ? 1 : 0;
  pressed[id] = isDown ? 1 : 0;
  released[id] = isDown ? 0 : 1;
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

window.addEventListener("keydown", ({ code, repeat }) => {
  if (repeat) return;
  setInput(code, true);
});

window.addEventListener("keyup", ({ code }) => {
  setInput(code, false);
});

canvas.addEventListener("pointerdown", ({ clientX, clientY, button }) => {
  const bounds = canvas.getBoundingClientRect();
  const x = clientX - bounds.left;
  const y = clientY - bounds.top;
  updatePointerPosition(x, y);
  setInput(button.toString(), true);
});

canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
  const bounds = canvas.getBoundingClientRect();
  const x = clientX - bounds.left;
  const y = clientY - bounds.top;
  updatePointerPosition(x, y);
  setInput(button.toString(), false);
});

canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
  const bounds = canvas.getBoundingClientRect();
  const x = clientX - bounds.left;
  const y = clientY - bounds.top;
  updatePointerPosition(x, y);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
