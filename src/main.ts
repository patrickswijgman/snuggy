import { clearBackground, resetTransform, setupCanvas } from "./canvas.js";
import { resetInputs, updateInputs } from "./input.js";
import { startLoop } from "./loop.js";

export async function run(size: number, setup: () => Promise<void>, update: () => void) {
  setupCanvas(size);
  await setup();
  startLoop(() => {
    resetTransform();
    clearBackground();
    updateInputs();
    update();
    resetInputs();
  });
}
