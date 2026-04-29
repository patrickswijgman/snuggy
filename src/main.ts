import { clearBackground, resetTransform, setupCanvas } from "./canvas.js";
import { type InputMap, resetInputs, setupInput, updateInputs } from "./input.js";
import { startLoop } from "./loop.js";

export async function run(width: number, height: number, setup: () => Promise<void>, update: () => void, map: InputMap) {
  setupCanvas(width, height);
  setupInput(map);
  await setup();
  startLoop(() => {
    clearBackground();
    resetTransform();
    updateInputs();
    update();
    resetInputs();
  });
}
