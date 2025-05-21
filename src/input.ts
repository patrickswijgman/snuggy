import { cameraX, cameraY } from "./camera.js";
import { canvas, scale } from "./canvas.js";

const inputsDown: Record<string, boolean> = Object.create(null);
const inputsPressed: Record<string, boolean> = Object.create(null);
const inputsReleased: Record<string, boolean> = Object.create(null);

export let pointerX = 0;
export let pointerY = 0;
export let pointerWorldX = 0;
export let pointerWorldY = 0;

export function updateInputs() {
  updatePointerWorldPosition();
}

export function resetInputs() {
  for (const id in inputsPressed) {
    inputsPressed[id] = false;
  }

  for (const id in inputsReleased) {
    inputsPressed[id] = false;
  }
}

export function isInputDown(id: string) {
  return inputsDown[id];
}

export function isInputPressed(id: string) {
  return inputsPressed[id];
}

export function isInputReleased(id: string) {
  return inputsReleased[id];
}

function setInput(id: string, isPressed: boolean) {
  inputsDown[id] = isPressed;
  inputsPressed[id] = isPressed;
  inputsReleased[id] = !isPressed;
}

function updatePointerPosition(x: number, y: number) {
  pointerX = x / scale;
  pointerY = y / scale;
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
  updatePointerPosition(clientX, clientY);
  setInput(button.toString(), true);
});

canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  setInput(button.toString(), false);
});

canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
  updatePointerPosition(clientX, clientY);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
