import { clearBackground, setupCanvas } from "./canvas.js";
import { resetInputs, updateInputs } from "./input.js";
import { startLoop } from "./loop.js";

export async function run(width: number, height: number, setup: () => Promise<void>, update: () => void) {
  setupCanvas(width, height);
  await setup();
  startLoop(() => {
    clearBackground();
    updateInputs();
    update();
    resetInputs();
  });
}
