import { clearBackground, setupCanvas } from "./canvas.ts";
import { resetInputs, updateInputs } from "./input.ts";
import { startLoop } from "./loop.ts";

export async function run(size: number, setup: () => Promise<void>, update: () => void) {
  setupCanvas(size);
  await setup();
  startLoop(() => {
    clearBackground();
    updateInputs();
    update();
    resetInputs();
  });
}
